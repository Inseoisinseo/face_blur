import { NextRequest, NextResponse } from 'next/server'
import { Polar } from '@polar-sh/sdk'

const polar = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  ...(process.env.POLAR_SANDBOX === 'true' ? { server: 'sandbox' as const } : {}),
})

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    const page = await polar.customers.list({ email, limit: 1 })
    const customer = page.result.items[0]
    if (!customer) {
      return NextResponse.json({ error: 'Customer not found' }, { status: 404 })
    }

    const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL ?? `https://${request.headers.get('host')}`}/dashboard`
    const session = await polar.customerSessions.create({ customerId: customer.id, returnUrl })
    return NextResponse.json({ url: session.customerPortalUrl })
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
