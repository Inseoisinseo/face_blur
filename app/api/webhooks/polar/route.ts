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
const PLAN_CREDITS: Record<string, number> = { pro: 50, ultra: 200 }

// subscription_update(업그레이드) 시 플랜별 추가 지급 크레딧
const UPGRADE_CREDITS: Record<string, number> = {
  ultra: 150, // pro → ultra 업그레이드 차액
}

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

  const activeSub = customer.activeSubscriptions[0] ?? null
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

  // 플랜이 실제로 상위 티어로 변경된 경우에만 업그레이드 크레딧 지급
  const upgradeCredits =
    prevPlan !== newPlan ? (UPGRADE_CREDITS[newPlan] ?? 0) : 0

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
