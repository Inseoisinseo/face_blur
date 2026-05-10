'use client'

import * as React from 'react'
import { createPortal } from 'react-dom'
import { BorderBeam } from '@/components/ui/border-beam'
import { useAuth } from '@/contexts/AuthContext'

interface PricingModalProps {
  open: boolean
  onClose: () => void
}

export function PricingModal({ open, onClose }: PricingModalProps) {
  const { user } = useAuth()
  const [loading, setLoading] = React.useState<'pro' | 'ultra' | null>(null)

  React.useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  const handleCheckout = async (plan: 'pro' | 'ultra') => {
    setLoading(plan)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, customerEmail: user?.email }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      window.location.href = data.url
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err)
      console.error('checkout error:', msg)
      alert(`결제 오류: ${msg}`)
      setLoading(null)
    }
  }

  if (!open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative rounded-[28px] p-8"
        style={{
          backgroundColor: 'rgba(16,16,16,0.98)',
          boxShadow: '0 24px 72px rgba(0,0,0,0.75)',
          width: '440px',
        }}
        onClick={e => e.stopPropagation()}
      >
        <BorderBeam size={180} duration={7} colorFrom="#8b5cf6" colorTo="#3b82f6" borderWidth={1.5} />
        <BorderBeam size={180} duration={7} delay={3.5} colorFrom="#3b82f6" colorTo="#8b5cf6" borderWidth={1.5} reverse />

        <div className="flex gap-4">
          {/* Pro */}
          <div
            className="flex-1 rounded-2xl p-6 flex flex-col"
            style={{
              backgroundColor: 'rgba(139,92,246,0.07)',
              border: '1px solid rgba(139,92,246,0.18)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(139,92,246,0.8)' }}>
              Pro
            </p>
            <p className="text-4xl font-bold text-white leading-none mb-1">$3</p>
            <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>50 credits</p>
            <button
              type="button"
              disabled={loading !== null}
              onClick={() => handleCheckout('pro')}
              className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-50 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.9), rgba(139,92,246,0.6))', color: '#fff' }}
            >
              {loading === 'pro' ? '처리 중…' : '구매하기'}
            </button>
          </div>

          {/* Ultra */}
          <div
            className="flex-1 rounded-2xl p-6 flex flex-col"
            style={{
              backgroundColor: 'rgba(59,130,246,0.07)',
              border: '1px solid rgba(59,130,246,0.18)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(99,179,237,0.85)' }}>
              Ultra
            </p>
            <p className="text-4xl font-bold text-white leading-none mb-1">$10</p>
            <p className="text-sm mt-3" style={{ color: 'rgba(255,255,255,0.4)' }}>200 credits</p>
            <button
              type="button"
              disabled={loading !== null}
              onClick={() => handleCheckout('ultra')}
              className="mt-6 w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity disabled:opacity-50 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(59,130,246,0.6))', color: '#fff' }}
            >
              {loading === 'ultra' ? '처리 중…' : '구매하기'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
