import { NextRequest, NextResponse } from 'next/server'
import { validateEvent, WebhookVerificationError } from '@polar-sh/sdk/webhooks'
import { createClient } from '@supabase/supabase-js'
import type { Order } from '@polar-sh/sdk/models/components/order.js'
import type { CustomerStateIndividual } from '@polar-sh/sdk/models/components/customerstateindividual.js'
import type { CustomerState } from '@polar-sh/sdk/models/components/customerstate.js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PRO_PRODUCT_ID = process.env.POLAR_PRO_PRODUCT_ID!
const ULTRA_PRODUCT_ID = process.env.POLAR_ULTRA_PRODUCT_ID!

// 플랜별 크레딧 (신규/갱신)
const PLAN_CREDITS: Record<string, number> = { pro: 200, ultra: 600 }

// pro → ultra 업그레이드 시 지급할 차액 크레딧 (600 - 200)
const PRO_TO_ULTRA_UPGRADE_CREDITS = 400

function productIdToPlan(productId: string | null | undefined): 'pro' | 'ultra' | null {
  if (productId === PRO_PRODUCT_ID) return 'pro'
  if (productId === ULTRA_PRODUCT_ID) return 'ultra'
  return null
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const headers = Object.fromEntries(request.headers.entries())

  let event
  try {
    event = validateEvent(body, headers, process.env.POLAR_WEBHOOK_SECRET!)
  } catch (err) {
    if (err instanceof WebhookVerificationError) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  try {
    if (event.type === 'order.paid') {
      await handleOrderPaid(event.data)
    } else if (event.type === 'customer.state_changed') {
      await handleCustomerStateChanged(event.data)
    }
  } catch (err) {
    console.error(`[polar webhook] ${event.type} handler error:`, err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function handleOrderPaid(order: Order) {
  const email = order.customer.email
  if (!email) return

  // Idempotency: skip if this order was already processed.
  const { data: existingPayment } = await supabase
    .from('payments')
    .select('id')
    .eq('polar_order_id', order.id)
    .maybeSingle()
  if (existingPayment) return

  // subscription.productId always reflects the post-upgrade plan (string, not nullable).
  // order.productId can be null for proration orders or may still carry the old plan ID.
  const resolvedProductId = order.subscription?.productId ?? order.productId ?? null
  const plan = productIdToPlan(resolvedProductId)
  if (!plan) return

  const { data: user } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .single()
  if (!user) return

  // billingReason에 따라 지급 크레딧 결정
  // subscription_update 업그레이드 크레딧은 customer.state_changed에서 처리
  let creditsToAdd = 0
  const reason = order.billingReason
  if (reason === 'subscription_create' || reason === 'subscription_cycle') {
    creditsToAdd = PLAN_CREDITS[plan]
  }

  await Promise.all([
    // 결제가 확인된 시점에 플랜을 즉시 반영 (customer.state_changed 타이밍과 무관하게)
    supabase
      .from('users')
      .update({ plan, subscription_status: 'active' })
      .eq('id', user.id),
    creditsToAdd > 0
      ? supabase.rpc('increment_user_credits', { p_user_id: user.id, p_amount: creditsToAdd })
      : Promise.resolve(),
    supabase.from('payments').insert({
      user_id: user.id,
      polar_order_id: order.id,
      amount: order.totalAmount,
      currency: order.currency.toUpperCase(),
      status: 'completed',
      plan,
      credits_added: creditsToAdd,
    }),
  ])
}

async function handleCustomerStateChanged(state: CustomerState) {
  if (state.type !== 'individual') return
  const customer = state as CustomerStateIndividual

  const { data: user } = await supabase
    .from('users')
    .select('id, plan')
    .eq('email', customer.email)
    .single()
  if (!user) return

  const prevPlan = (user as { id: string; plan: string }).plan as 'free' | 'pro' | 'ultra'

  // 다운그레이드 시 cancelAtPeriodEnd=true인 구독(이전 플랜)보다
  // 실제 활성 구독(새 플랜)을 우선 선택한다.
  const activeSub =
    customer.activeSubscriptions.find((s) => !s.cancelAtPeriodEnd) ??
    customer.activeSubscriptions[0] ??
    null
  const newPlan: 'free' | 'pro' | 'ultra' =
    (activeSub ? productIdToPlan(activeSub.productId) : null) ?? 'free'

  let subscriptionStatus: 'active' | 'canceled' | 'inactive'
  if (!activeSub) {
    subscriptionStatus = 'inactive'
  } else if (activeSub.cancelAtPeriodEnd) {
    subscriptionStatus = 'canceled'
  } else {
    subscriptionStatus = 'active'
  }

  // pro → ultra 업그레이드 시에만 차액 크레딧 지급
  const upgradeCredits =
    prevPlan === 'pro' && newPlan === 'ultra' ? PRO_TO_ULTRA_UPGRADE_CREDITS : 0

  await Promise.all([
    supabase
      .from('users')
      .update({ plan: newPlan, subscription_status: subscriptionStatus })
      .eq('id', user.id),
    upgradeCredits > 0
      ? supabase.rpc('increment_user_credits', { p_user_id: user.id, p_amount: upgradeCredits })
      : Promise.resolve(),
  ])
}
