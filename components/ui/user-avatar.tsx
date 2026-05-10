'use client'

import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'

export function UserAvatar() {
  const { user, loading } = useAuth()

  if (loading || !user) return null

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined
  const name = (user.user_metadata?.full_name ?? user.email ?? '') as string

  return (
    <div className="fixed top-4 right-4 z-50">
      {avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={name}
          width={36}
          height={36}
          className="rounded-full border-2 border-white/20 shadow-lg"
        />
      ) : (
        <div className="w-9 h-9 rounded-full border-2 border-white/20 shadow-lg bg-foreground/10 flex items-center justify-center text-sm font-semibold">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  )
}
