'use client'

import Link from 'next/link'
import { BorderBeam } from '@/components/ui/border-beam'

const CHECK_ICON = (color: string) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <circle cx="7" cy="7" r="6.5" stroke={color} strokeOpacity="0.4" />
    <path d="M4 7l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FREE_FEATURES = [
  '월 10 크레딧 제공',
  '블러 · 모자이크 · 이모티콘',
  'FaceBlur 워터마크 포함',
]

const PRO_FEATURES = [
  '이미지 200회 처리',
  '블러 · 모자이크 · 이모티콘',
  '고해상도 출력',
  '워터마크 없음',
]

const ULTRA_FEATURES = [
  '이미지 600회 처리',
  '블러 · 모자이크 · 이모티콘',
  '고해상도 출력',
  '워터마크 없음',
  '최우선 처리 속도',
]

export function PricingSection() {
  return (
    <section id="pricing" className="relative w-full flex flex-col items-center py-24 px-4 overflow-hidden bg-background text-foreground">
      {/* Background gradients matching HeroSection */}
      <div className="absolute inset-0 z-0 opacity-15" aria-hidden="true">
        <div className="absolute bottom-0 left-[-20%] top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(128,90,213,0.3),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 right-[-20%] top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,123,255,0.3),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center gap-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-muted-foreground">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M6.5 1L7.8 4.7L11.5 6L7.8 7.3L6.5 11L5.2 7.3L1.5 6L5.2 4.7L6.5 1Z" fill="currentColor" />
            </svg>
            심플한 크레딧 요금제
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
            필요한 만큼만{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}
            >
              충전하세요
            </span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            구독 없이 크레딧을 한 번만 구매하세요.
            <br />
            크레딧은 만료되지 않습니다.
          </p>
        </div>

        {/* Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Free */}
          <div
            className="relative rounded-[28px] p-7 flex flex-col"
            style={{
              backgroundColor: 'rgba(16,16,16,0.98)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Free
            </p>
            <p className="text-5xl font-bold text-white leading-none">$0</p>
            <p className="text-sm mt-2 mb-7" style={{ color: 'rgba(255,255,255,0.35)' }}>
              10 credits / 월
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {CHECK_ICON('rgba(255,255,255,0.5)')}
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/auth"
              className="mt-auto block w-full py-2.5 rounded-xl text-sm font-semibold text-center transition-opacity hover:opacity-80"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              무료로 시작하기
            </Link>
          </div>

          {/* Pro */}
          <div
            className="relative rounded-[28px] p-7 flex flex-col"
            style={{
              backgroundColor: 'rgba(16,16,16,0.98)',
              border: '1px solid rgba(139,92,246,0.18)',
            }}
          >
            <BorderBeam size={160} duration={8} colorFrom="#8b5cf6" colorTo="#3b82f6" borderWidth={1.5} />

            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(139,92,246,0.8)' }}>
              Pro
            </p>
            <p className="text-5xl font-bold text-white leading-none">$5</p>
            <p className="text-sm mt-2 mb-7" style={{ color: 'rgba(255,255,255,0.35)' }}>
              200 credits
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {CHECK_ICON('#8b5cf6')}
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/auth"
              className="mt-auto block w-full py-2.5 rounded-xl text-sm font-semibold text-center text-white transition-opacity hover:opacity-80"
              style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.9), rgba(139,92,246,0.6))' }}
            >
              시작하기
            </Link>
          </div>

          {/* Ultra */}
          <div
            className="relative rounded-[28px] p-7 flex flex-col"
            style={{
              backgroundColor: 'rgba(16,16,16,0.98)',
              border: '1px solid rgba(59,130,246,0.18)',
            }}
          >
            <BorderBeam size={160} duration={8} delay={4} colorFrom="#3b82f6" colorTo="#8b5cf6" borderWidth={1.5} />

            <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'rgba(99,179,237,0.85)' }}>
              Ultra
            </p>
            <p className="text-5xl font-bold text-white leading-none">$15</p>
            <p className="text-sm mt-2 mb-7" style={{ color: 'rgba(255,255,255,0.35)' }}>
              600 credits
            </p>

            <ul className="flex flex-col gap-3 mb-8">
              {ULTRA_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {CHECK_ICON('#3b82f6')}
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href="/auth"
              className="mt-auto block w-full py-2.5 rounded-xl text-sm font-semibold text-center text-white transition-opacity hover:opacity-80"
              style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.9), rgba(59,130,246,0.6))' }}
            >
              시작하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
