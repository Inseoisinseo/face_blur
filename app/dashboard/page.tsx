'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { DashboardNavbar } from '@/components/dashboard/Navbar'
import { PromptArea } from '@/components/dashboard/PromptArea'

const GRID_BG = {
    backgroundColor: '#181818',
    backgroundImage: [
        'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)',
        'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '32px 32px',
}

export default function DashboardPage() {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth')
        }
    }, [user, loading, router])

    if (loading || !user) {
        return (
            <div
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: '#181818' }}
            >
                <div className="w-6 h-6 border-2 border-white/20 border-t-white/70 rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <div className="min-h-screen text-white" style={GRID_BG}>
            <DashboardNavbar />
            <main className="flex items-center justify-center min-h-screen px-4">
                <PromptArea />
            </main>
        </div>
    )
}
