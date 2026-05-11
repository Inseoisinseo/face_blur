
'use client'

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import type { Session, User } from '@supabase/supabase-js'
import { createClient } from '@/lib/supabase/client'

type Plan = 'free' | 'pro' | 'ultra'

type SubscriptionStatus = 'active' | 'canceled' | 'inactive'

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  plan: Plan
  credits: number
  subscriptionStatus: SubscriptionStatus
  refreshCredits: () => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  plan: 'free',
  credits: 0,
  subscriptionStatus: 'inactive',
  refreshCredits: async () => { },
  signOut: async () => { },
  signInWithGoogle: async () => { },
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [plan, setPlan] = useState<Plan>('free')
  const [credits, setCredits] = useState(0)
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('inactive')

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

  const fetchUserData = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('plan, credits, subscription_status')
      .eq('id', userId)
      .single()
    if (data) {
      setPlan((data.plan as Plan | null) ?? 'free')
      setCredits(data.credits ?? 0)
      setSubscriptionStatus((data.subscription_status as SubscriptionStatus | null) ?? 'inactive')
    }
  }, [supabase])

  useEffect(() => {
    if (!user) {
      setPlan('free')
      setCredits(0)
      setSubscriptionStatus('inactive')
      return
    }
    fetchUserData(user.id)
  }, [user, fetchUserData])

  const refreshCredits = useCallback(async () => {
    if (!user) return
    await fetchUserData(user.id)
  }, [user, fetchUserData])

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
    <AuthContext.Provider value={{ user, session, loading, plan, credits, subscriptionStatus, refreshCredits, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
