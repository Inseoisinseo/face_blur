'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { DashboardNavbar } from '@/components/dashboard/Navbar'
import { PromptArea, type ResultItem, type ImageItem } from '@/components/dashboard/PromptArea'
import { GallerySidebar, SIDEBAR_WIDTH, type GalleryItem } from '@/components/dashboard/GallerySidebar'

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
    const [galleryItems, setGalleryItems] = React.useState<GalleryItem[]>([])
    const addImageRef = React.useRef<((item: ImageItem) => void) | null>(null)

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth')
        }
    }, [user, loading, router])

    const handleNewResults = React.useCallback((results: ResultItem[]) => {
        if (results.length === 0) return
        setGalleryItems(prev => [
            ...results.map((r, i) => ({
                id: `${Date.now()}-${i}`,
                imageBase64: r.imageBase64,
                mimeType: r.mimeType,
                name: r.name,
            })),
            ...prev,
        ])
    }, [])

    const handleAttach = React.useCallback((item: GalleryItem) => {
        addImageRef.current?.({
            preview: `data:${item.mimeType};base64,${item.imageBase64}`,
            mimeType: item.mimeType,
            name: item.name,
        })
    }, [])

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
            <GallerySidebar items={galleryItems} onAttach={handleAttach} />
            <main
                className="flex items-center justify-center min-h-screen px-4"
                style={{ marginLeft: SIDEBAR_WIDTH }}
            >
                <PromptArea onNewResults={handleNewResults} addImageRef={addImageRef} />
            </main>
        </div>
    )
}
