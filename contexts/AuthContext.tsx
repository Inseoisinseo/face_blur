
'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

type Plan = 'free' | 'pro' | 'ultra'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  plan: Plan
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  plan: 'free',
  signOut: async () => { },
  signInWithGoogle: async () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<Plan>('free')

  const supabase = useMemo(() => createClient(), [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  useEffect(() => {
    if (!user) {
      setPlan('free')
      return
    }
    supabase
      .from('users')
      .select('plan')
      .eq('id', user.id)
      .single()
      .then(({ data }) => setPlan((data?.plan as Plan | null) ?? 'free'))
  }, [user, supabase])

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <AuthContext.Provider value={{ user, session, loading, plan, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
