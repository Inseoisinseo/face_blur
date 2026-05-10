'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { useAuth } from '@/contexts/AuthContext'
import { PricingModal } from './PricingModal'

const FLOAT_STYLE: React.CSSProperties = {
  backgroundColor: 'rgba(255, 255, 255, 0.07)',
  border: '1px solid rgba(255, 255, 255, 0.12)',
  backdropFilter: 'blur(16px)',
  WebkitBackdropFilter: 'blur(16px)',
  boxShadow: '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
}

export function DashboardNavbar() {
  const { user, plan, signOut } = useAuth()
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [pricingOpen, setPricingOpen] = React.useState(false)
  const [portalLoading, setPortalLoading] = React.useState(false)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const name = (user?.user_metadata?.full_name ?? user?.email ?? '') as string
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined

  const handleSignOut = async () => {
    await signOut()
    router.replace('/')
  }

  const handleManageSubscription = async () => {
    if (!user?.email) return
    setPortalLoading(true)
    try {
      const res = await fetch('/api/customer-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (err) {
      console.error('customer portal error:', err)
    } finally {
      setPortalLoading(false)
    }
  }

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  const cancelClose = () => {
    clearTimeout(closeTimer.current)
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-start justify-between p-5 pointer-events-none"
      aria-label="Dashboard navigation"
    >
      {/* Logo — floating button */}
      <button
        type="button"
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-2.5 rounded-2xl transition-colors hover:bg-white/10 cursor-pointer"
        style={FLOAT_STYLE}
      >
        <div
          className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold select-none text-white shrink-0"
          style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
        >
          F
        </div>
        <span className="text-sm font-semibold text-white/90 tracking-tight">Face Blur</span>
      </button>

      {/* Profile — floating popover button */}
      <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
        <PopoverPrimitive.Trigger asChild>
          <button
            type="button"
            onMouseEnter={() => { cancelClose(); setOpen(true) }}
            onMouseLeave={scheduleClose}
            className="pointer-events-auto flex items-center p-1.5 rounded-2xl transition-colors hover:bg-white/10 cursor-pointer"
            style={FLOAT_STYLE}
          >
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={name}
                width={30}
                height={30}
                className="rounded-full block"
              />
            ) : (
              <div
                className="w-[30px] h-[30px] rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              >
                {name.charAt(0).toUpperCase()}
              </div>
            )}
          </button>
        </PopoverPrimitive.Trigger>

        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Content
            align="end"
            sideOffset={10}
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
            className="z-50 w-52 rounded-2xl p-1.5 outline-none"
            style={{
              backgroundColor: 'rgba(26,26,26,0.97)',
              border: '1px solid rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
            }}
          >
            {/* User info */}
            <div
              className="px-3 py-2.5 mb-1 border-b"
              style={{ borderColor: 'rgba(255,255,255,0.08)' }}
            >
              <p className="text-sm font-medium truncate" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {name}
              </p>
              <p className="text-xs truncate mt-0.5" style={{ color: 'rgba(255,255,255,0.38)' }}>
                {user?.email}
              </p>
            </div>

            {/* Pricing / Subscription */}
            {plan === 'free' ? (
              <button
                type="button"
                onClick={() => { setOpen(false); setPricingOpen(true) }}
                className="w-full text-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer hover:bg-white/90"
                style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: '#0a0a0a' }}
              >
                플랜 업그레이드
              </button>
            ) : (
              <button
                type="button"
                disabled={portalLoading}
                onClick={() => { setOpen(false); handleManageSubscription() }}
                className="w-full text-center px-3 py-2.5 text-sm font-semibold rounded-xl transition-colors cursor-pointer hover:bg-white/90 disabled:opacity-50"
                style={{ backgroundColor: 'rgba(255,255,255,0.8)', color: '#0a0a0a' }}
              >
                {portalLoading ? '로딩 중…' : '구독 관리'}
              </button>
            )}

            {/* Sign out */}
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full text-left px-3 py-2 text-sm rounded-xl transition-colors cursor-pointer hover:bg-white/[0.07]"
              style={{ color: '#f87171' }}
            >
              로그아웃
            </button>
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>

      <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </nav>
  )
}
