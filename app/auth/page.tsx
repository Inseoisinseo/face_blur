'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M6.5 1L11 3V7C11 9.5 9 11.5 6.5 12C4 11.5 2 9.5 2 7V3L6.5 1Z"
        fill="currentColor"
        opacity="0.8"
      />
    </svg>
  )
}

export default function AuthPage() {
  const { user, loading, signInWithGoogle } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard')
    }
  }, [user, loading, router])

  if (loading || user) return null

  return (
    <div className="flex w-full min-h-screen overflow-hidden">
      {/* Left Panel — 3/5 */}
      <div className="relative hidden md:flex flex-col w-3/5 overflow-hidden bg-black">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black" />
        {/* Accent glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-violet-900/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-900/20 blur-3xl" />
        {/* Semi-transparent black overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-12 xl:p-16">
          {/* Person image */}
          <div className="flex-1 flex items-start justify-center pt-10">
            <div className="relative w-56 h-72 xl:w-64 xl:h-80 rounded-2xl overflow-hidden border border-white/10">
              <Image
                src="/pic.png"
                alt="person"
                fill
                className="object-cover"
              />
              <span
                className="absolute text-5xl select-none pointer-events-none"
                style={{ left: '55%', top: '33%', transform: 'translate(-50%, -50%)' }}
                aria-hidden="true"
              >
                😊
              </span>
            </div>
          </div>

          {/* Oversized display text */}
          <div>
            <p className="text-white/30 text-xs tracking-[0.4em] uppercase mb-3 font-mono">
              AI Privacy Tool
            </p>
            <h1
              className="font-black leading-none tracking-tighter text-white select-none"
              style={{ fontSize: 'clamp(4.5rem, 9vw, 9rem)' }}
            >
              FACE
              <br />
              BLUR
            </h1>
          </div>
        </div>
      </div>

      {/* Right Panel — 2/5 */}
      <div className="w-full md:w-2/5 flex flex-col items-center justify-center bg-background text-foreground px-8 py-12">
        <div className="w-full max-w-sm flex flex-col items-center text-center space-y-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-muted-foreground">
              <ShieldIcon />
              안전한 로그인
            </div>

            <div>
              <h2 className="text-3xl font-bold tracking-tighter leading-[1.1]">
                얼굴을 감추는{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}
                >
                  스마트한 방법
                </span>
              </h2>
              <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                계속하려면 Google 계정으로 로그인하세요.
              </p>
            </div>
          </div>

          {/* Card */}
          <div className="w-full rounded-3xl border border-foreground/10 bg-foreground/[0.03] backdrop-blur-sm p-8 space-y-5">
            <button
              type="button"
              onClick={signInWithGoogle}
              className="w-full flex items-center justify-center gap-3 h-12 rounded-xl border border-foreground/15 bg-background hover:bg-foreground/5 transition-colors text-sm font-medium cursor-pointer"
            >
              <GoogleIcon />
              Google로 계속하기
            </button>

            <p className="text-xs text-muted-foreground leading-relaxed">
              로그인하면{' '}
              <Link href="/terms" className="underline underline-offset-2 hover:text-foreground transition-colors">
                이용약관
              </Link>
              {' '}및{' '}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-foreground transition-colors">
                개인정보처리방침
              </Link>
              에 동의하는 것으로 간주됩니다.
            </p>
          </div>

          {/* Back link */}
          <a
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ← 홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
}
