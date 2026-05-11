import { NextRequest, NextResponse } from 'next/server'
import { Polar } from '@polar-sh/sdk'

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  ...(process.env.POLAR_SANDBOX === 'true' ? { server: 'sandbox' as const } : {}),
})

export async function POST(request: NextRequest) {
  try {
    const { plan, customerEmail } = await request.json()

    const productIdMap: Record<string, string | undefined> = {
      pro: process.env.POLAR_PRO_PRODUCT_ID,
      ultra: process.env.POLAR_ULTRA_PRODUCT_ID,
    }

    const productId = productIdMap[plan]
    if (!productId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
      request.headers.get('x-real-ip') ??
      undefined

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      `${request.headers.get('x-forwarded-proto') ?? 'https'}://${request.headers.get('host')}`

    const checkout = await polar.checkouts.create({
      products: [productId],
      customerEmail: customerEmail ?? undefined,
      customerIpAddress: ip,
      successUrl: `${baseUrl}/dashboard`,
    })

    return NextResponse.json({ url: checkout.url })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Polar checkout error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
