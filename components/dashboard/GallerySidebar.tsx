'use client'

import * as React from 'react'
import Image from 'next/image'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { motion, AnimatePresence } from 'motion/react'

export interface GalleryItem {
  id: string
  imageBase64?: string
  imageUrl?: string
  mimeType: string
  name: string
}


function itemSrc(item: GalleryItem): string {
  return item.imageUrl ?? `data:${item.mimeType};base64,${item.imageBase64 ?? ''}`
}

const DownloadIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const ImagesIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </svg>
)

const PaperclipIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
  </svg>
)

const GLASS_SIDEBAR: React.CSSProperties = {
  backgroundColor: 'rgba(32, 32, 32, 0.82)',
  backdropFilter: 'blur(36px) saturate(1.8)',
  WebkitBackdropFilter: 'blur(36px) saturate(1.8)',
  borderRight: '1px solid rgba(255, 255, 255, 0.07)',
  boxShadow: 'inset -1px 0 0 rgba(0,0,0,0.12), 6px 0 32px rgba(0,0,0,0.35)',
}

const POPOVER_STYLE: React.CSSProperties = {
  backgroundColor: 'rgba(30, 30, 30, 0.96)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.1)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
}

export const SIDEBAR_WIDTH = 310

interface GallerySidebarProps {
  items: GalleryItem[]
  onAttach?: (item: GalleryItem) => void
  mobileOpen?: boolean
  onMobileClose?: () => void
}

export function GallerySidebar({ items, onAttach, mobileOpen = false, onMobileClose }: GallerySidebarProps) {
  const [previewItem, setPreviewItem] = React.useState<GalleryItem | null>(null)
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)
  const closeTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined)

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setHoveredId(null), 150)
  }
  const cancelClose = () => clearTimeout(closeTimer.current)

  const handleDownload = (e: React.MouseEvent, item: GalleryItem) => {
    e.stopPropagation()
    const a = document.createElement('a')
    a.href = itemSrc(item)
    a.download = item.name
    a.click()
  }

  const handleDialogDownload = () => {
    if (!previewItem) return
    const a = document.createElement('a')
    a.href = itemSrc(previewItem)
    a.download = previewItem.name
    a.click()
  }

  return (
    <>
      {/* Mobile backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onMobileClose}
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed left-0 top-0 bottom-0 z-40 flex flex-col pt-[72px] transition-transform duration-300 ease-in-out ${mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ ...GLASS_SIDEBAR, width: SIDEBAR_WIDTH }}
      >
        {/* Specular shine */}
        <div
          className="absolute inset-x-0 top-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(150deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.015) 35%, transparent 65%)' }}
        />

        {/* Header */}
        <div
          className="relative flex items-center justify-between px-4 py-3"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.65)' }}>
            생성 기록
          </span>
          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <span
                className="text-[11px] px-2 py-0.5 rounded-full tabular-nums"
                style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.38)' }}
              >
                {items.length}
              </span>
            )}
            <button
              type="button"
              onClick={onMobileClose}
              aria-label="닫기"
              className="md:hidden flex items-center justify-center w-6 h-6 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Gallery */}
        <div className="relative flex-1 overflow-y-auto p-3" style={{ scrollbarWidth: 'none' }}>
          <AnimatePresence mode="popLayout">
            {items.length === 0 ? (
              <motion.div
                key="empty"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  <ImagesIcon className="h-5 w-5" style={{ color: 'rgba(255,255,255,0.25)' }} />
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.28)' }}>
                  이미지를 처리하면<br />여기에 기록됩니다
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="grid"
                className="grid grid-cols-2 gap-2"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <PopoverPrimitive.Root
                      key={item.id}
                      open={hoveredId === item.id}
                    >
                      <PopoverPrimitive.Trigger asChild>
                        <motion.div
                          layout
                          className="relative group aspect-square rounded-[14px] overflow-hidden cursor-pointer"
                          style={{ backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                          initial={{ opacity: 0, scale: 0.88 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.88 }}
                          transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
                          onMouseEnter={() => { cancelClose(); setHoveredId(item.id) }}
                          onMouseLeave={scheduleClose}
                          onClick={() => setPreviewItem(item)}
                        >
                          <Image
                            unoptimized
                            src={itemSrc(item)}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />

                          {/* always-visible download button */}
                          <div
                            className="absolute inset-0 flex items-center justify-center"
                            style={{ background: 'rgba(0,0,0,0.18)' }}
                          >
                            <button
                              type="button"
                              aria-label="다운로드"
                              onClick={(e) => handleDownload(e, item)}
                              className="flex items-center justify-center w-8 h-8 rounded-full transition-colors hover:bg-white/30"
                              style={{ backgroundColor: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}
                            >
                              <DownloadIcon className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </motion.div>
                      </PopoverPrimitive.Trigger>

                      <PopoverPrimitive.Portal>
                        <PopoverPrimitive.Content
                          side="right"
                          sideOffset={12}
                          align="start"
                          className="z-50 w-52 rounded-2xl overflow-hidden p-0 outline-none"
                          style={POPOVER_STYLE}
                          onMouseEnter={cancelClose}
                          onMouseLeave={scheduleClose}
                          onOpenAutoFocus={e => e.preventDefault()}
                        >
                          {/* Preview image */}
                          <div className="relative w-full aspect-square">
                            <Image
                              unoptimized
                              src={itemSrc(item)}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Actions */}
                          <div className="p-2 flex flex-col gap-1.5">
                            {onAttach && (
                              <button
                                type="button"
                                onClick={() => { onAttach(item); setHoveredId(null) }}
                                className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/10"
                                style={{ color: 'rgba(255,255,255,0.82)' }}
                              >
                                <PaperclipIcon className="h-4 w-4 shrink-0" />
                                이 사진 첨부하기
                              </button>
                            )}
                            <button
                              type="button"
                              onClick={(e) => handleDownload(e, item)}
                              className="flex w-full items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/10"
                              style={{ color: 'rgba(255,255,255,0.5)' }}
                            >
                              <DownloadIcon className="h-4 w-4 shrink-0" />
                              다운로드
                            </button>
                          </div>
                        </PopoverPrimitive.Content>
                      </PopoverPrimitive.Portal>
                    </PopoverPrimitive.Root>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </aside>

      {/* Full-size preview dialog */}
      <DialogPrimitive.Root open={!!previewItem} onOpenChange={open => { if (!open) setPreviewItem(null) }}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
          <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-[90vw] md:max-w-[800px] -translate-x-1/2 -translate-y-1/2 border-none bg-transparent p-0 shadow-none">
            <DialogPrimitive.Title className="sr-only">이미지 미리보기</DialogPrimitive.Title>
            <div
              className="relative rounded-[28px] overflow-hidden p-1"
              style={{ backgroundColor: '#2a2a2a', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              {previewItem && (
                <Image
                  unoptimized
                  src={itemSrc(previewItem)}
                  alt="전체 크기 미리보기"
                  width={1200}
                  height={900}
                  className="w-full max-h-[75vh] md:max-h-[90vh] object-contain rounded-[24px]"
                  style={{ height: 'auto' }}
                />
              )}

              {/* Center download button — desktop hover only */}
              <div className="absolute inset-0 hidden md:flex items-center justify-center pointer-events-none">
                <button
                  type="button"
                  onClick={handleDialogDownload}
                  className="pointer-events-auto flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium opacity-0 hover:opacity-100 transition-opacity duration-200"
                  style={{ backgroundColor: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.9)' }}
                >
                  <DownloadIcon className="w-4 h-4" />
                  다운로드
                </button>
              </div>

              {/* Desktop close button */}
              <DialogPrimitive.Close
                className="absolute right-3 top-3 z-10 hidden md:flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">닫기</span>
              </DialogPrimitive.Close>

              {/* Mobile action bar */}
              <div
                className="md:hidden flex items-center gap-2 px-2 pt-1 pb-1"
              >
                <button
                  type="button"
                  onClick={handleDialogDownload}
                  className="flex flex-1 items-center justify-center gap-2 py-3 rounded-2xl text-sm font-medium transition-colors active:bg-white/10"
                  style={{ backgroundColor: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)' }}
                >
                  <DownloadIcon className="w-4 h-4" />
                  다운로드
                </button>
                <DialogPrimitive.Close
                  className="flex flex-1 items-center justify-center gap-2 py-3 rounded-2xl text-sm font-semibold transition-colors active:bg-white/10"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.9)' }}
                >
                  <XIcon className="w-4 h-4" />
                  닫기
                </DialogPrimitive.Close>
              </div>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  )
}
