'use client'

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: '기능', href: '/#features' },
  { label: '가격', href: '/#pricing' },
] as const

export function LandingNavbar() {
  const [scrolled, setScrolled] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (window.scrollY > 40) setMenuOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex flex-col items-center pt-4 px-4 pointer-events-none">
      {/* Main bar */}
      <nav
        className={cn(
          'pointer-events-auto w-full transition-all duration-500 ease-in-out',
          'flex items-center justify-between px-4 py-2.5 rounded-2xl',
          scrolled ? 'max-w-xl' : 'max-w-5xl',
        )}
        style={
          scrolled
            ? {
                backgroundColor: 'rgba(12, 12, 12, 0.88)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.45)',
              }
            : {
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
              }
        }
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
          >
            F
          </div>
          <span className="text-sm font-semibold text-white/90 tracking-tight">Face Blur</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="px-3 py-1.5 rounded-lg text-sm text-white/55 hover:text-white hover:bg-white/[0.07] transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/auth"
            className="ml-2 px-4 py-1.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
          >
            시작하기
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-white/10 transition-colors duration-150 cursor-pointer"
        >
          <span
            className={cn(
              'block w-5 h-0.5 bg-white/80 rounded-full transition-transform duration-200 origin-center',
              menuOpen && 'translate-y-[7px] rotate-45',
            )}
          />
          <span
            className={cn(
              'block w-5 h-0.5 bg-white/80 rounded-full transition-opacity duration-150',
              menuOpen && 'opacity-0',
            )}
          />
          <span
            className={cn(
              'block w-5 h-0.5 bg-white/80 rounded-full transition-transform duration-200 origin-center',
              menuOpen && '-translate-y-[7px] -rotate-45',
            )}
          />
        </button>
      </nav>

      {/* Mobile dropdown */}
      <div
        className={cn(
          'pointer-events-auto w-full max-w-sm mt-2 rounded-2xl p-2 md:hidden',
          'transition-all duration-200 origin-top',
          menuOpen
            ? 'opacity-100 scale-y-100 translate-y-0'
            : 'opacity-0 scale-y-95 -translate-y-1 pointer-events-none',
        )}
        style={{
          backgroundColor: 'rgba(12, 12, 12, 0.97)',
          border: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
        }}
      >
        {NAV_LINKS.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            onClick={() => setMenuOpen(false)}
            className="block px-4 py-3 rounded-xl text-sm font-medium text-white/65 hover:text-white hover:bg-white/[0.07] transition-colors duration-150"
          >
            {label}
          </Link>
        ))}
        <div className="mt-1 px-2 pb-1">
          <Link
            href="/auth"
            onClick={() => setMenuOpen(false)}
            className="block w-full py-2.5 rounded-xl text-sm font-semibold text-white text-center transition-opacity hover:opacity-85"
            style={{ background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)' }}
          >
            시작하기
          </Link>
        </div>
      </div>
    </div>
  )
}
