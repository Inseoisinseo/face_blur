'use client'

import * as React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { createClient } from '@/lib/supabase/client'
import { DashboardNavbar } from '@/components/dashboard/Navbar'
import { PromptArea, type ResultItem, type ImageItem } from '@/components/dashboard/PromptArea'
import { GallerySidebar, type GalleryItem } from '@/components/dashboard/GallerySidebar'

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
    const supabase = React.useMemo(() => createClient(), [])
    const [galleryItems, setGalleryItems] = React.useState<GalleryItem[]>([])
    const [sidebarOpen, setSidebarOpen] = React.useState(false)
    const addImageRef = React.useRef<((item: ImageItem) => void) | null>(null)

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/auth')
        }
    }, [user, loading, router])

    // Supabase DB에서 생성 기록 불러오기
    useEffect(() => {
        if (!user) return
        async function loadHistory() {
            const { data: records } = await supabase
                .from('blurpic')
                .select('id, blurred_path, original_filename, method, created_at')
                .eq('status', 'completed')
                .order('created_at', { ascending: false })
                .limit(50)

            if (!records || records.length === 0) return

            const paths = records.map((r: { blurred_path: string }) => r.blurred_path).filter(Boolean)
            const { data: signedUrls } = await supabase.storage
                .from('blurimage')
                .createSignedUrls(paths, 60 * 60 * 24 * 365)

            const urlMap = new Map(
                (signedUrls ?? [])
                    .filter((s) => s.path != null && s.signedUrl != null)
                    .map((s) => [s.path as string, s.signedUrl as string])
            )

            const items: GalleryItem[] = records.map((r: {
                id: string
                blurred_path: string
                original_filename: string
                method: string
            }) => {
                const ext = r.blurred_path?.split('.').pop() ?? 'jpg'
                const mimeType = ext === 'png' ? 'image/png' : 'image/jpeg'
                return {
                    id: r.id,
                    imageUrl: urlMap.get(r.blurred_path) as string | undefined,
                    mimeType,
                    name: r.original_filename ?? `${r.method}-${r.id}.${ext}`,
                }
            })

            setGalleryItems(items)
        }
        loadHistory()
    }, [user, supabase])

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

    const handleAttach = React.useCallback(async (item: GalleryItem) => {
        if (item.imageBase64) {
            addImageRef.current?.({
                preview: `data:${item.mimeType};base64,${item.imageBase64}`,
                mimeType: item.mimeType,
                name: item.name,
            })
        } else if (item.imageUrl) {
            const res = await fetch(item.imageUrl)
            const blob = await res.blob()
            const reader = new FileReader()
            reader.onload = () => {
                addImageRef.current?.({
                    preview: reader.result as string,
                    mimeType: item.mimeType,
                    name: item.name,
                })
            }
            reader.readAsDataURL(blob)
        }
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
            <DashboardNavbar onToggleSidebar={() => setSidebarOpen(v => !v)} />
            <GallerySidebar
                items={galleryItems}
                onAttach={handleAttach}
                mobileOpen={sidebarOpen}
                onMobileClose={() => setSidebarOpen(false)}
            />
            <main
                className="flex items-center justify-center min-h-screen px-4 md:ml-[310px]"
            >
                <PromptArea onNewResults={handleNewResults} addImageRef={addImageRef} />
            </main>
        </div>
    )
}
