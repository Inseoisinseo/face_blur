'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import Image from 'next/image'
import { BorderBeam } from '@/components/ui/border-beam'
import { LoadingState } from '@/components/dashboard/LoadingState'
import { PricingModal } from '@/components/dashboard/PricingModal'
import { useAuth } from '@/contexts/AuthContext'

function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(' ')
}

// ── Tooltip ────────────────────────────────────────────────────────────────────

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & { showArrow?: boolean }
>(({ className, sideOffset = 4, showArrow = false, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn('relative z-50 max-w-[280px] rounded-lg px-2 py-1 text-xs', className)}
      style={{
        backgroundColor: '#2a2a2a',
        color: 'rgba(255,255,255,0.82)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      }}
      {...props}
    >
      {children}
      {showArrow && <TooltipPrimitive.Arrow style={{ fill: '#2a2a2a' }} />}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

// ── Popover ────────────────────────────────────────────────────────────────────

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn('z-50 w-56 rounded-2xl p-1.5 outline-none', className)}
      style={{
        backgroundColor: '#252525',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.55)',
      }}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

// ── Dialog ─────────────────────────────────────────────────────────────────────

const Dialog = DialogPrimitive.Root

const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn('fixed inset-0 z-50 bg-black/70 backdrop-blur-sm', className)}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 w-full max-w-[90vw] md:max-w-[800px] -translate-x-1/2 -translate-y-1/2 border-none bg-transparent p-0 shadow-none',
        className
      )}
      {...props}
    >
      <div className="relative rounded-[28px] overflow-hidden p-1" style={{ backgroundColor: '#2a2a2a' }}>
        {children}
        <DialogPrimitive.Close
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full transition-colors hover:bg-white/10"
          style={{ color: 'rgba(255,255,255,0.6)' }}
        >
          <XIcon className="h-4 w-4" />
          <span className="sr-only">닫기</span>
        </DialogPrimitive.Close>
      </div>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

// ── Icons ──────────────────────────────────────────────────────────────────────

const PlusIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const Settings2Icon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M20 7h-9" /><path d="M14 17H5" />
    <circle cx="17" cy="17" r="3" /><circle cx="7" cy="7" r="3" />
  </svg>
)

const SendIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...p}>
    <path d="M12 5.25L12 18.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18.75 12L12 5.25L5.25 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const XIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const MicIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
  </svg>
)

const BlurIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="7" strokeOpacity="0.35" strokeDasharray="3 2" />
    <circle cx="12" cy="12" r="10" strokeOpacity="0.15" strokeDasharray="2 3" />
  </svg>
)

const MosaicIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}>
    <rect x="3" y="3" width="4" height="4" rx="0.5" /><rect x="10" y="3" width="4" height="4" rx="0.5" /><rect x="17" y="3" width="4" height="4" rx="0.5" />
    <rect x="3" y="10" width="4" height="4" rx="0.5" /><rect x="10" y="10" width="4" height="4" rx="0.5" /><rect x="17" y="10" width="4" height="4" rx="0.5" />
    <rect x="3" y="17" width="4" height="4" rx="0.5" /><rect x="10" y="17" width="4" height="4" rx="0.5" /><rect x="17" y="17" width="4" height="4" rx="0.5" />
  </svg>
)

const EmojiIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2.5" />
    <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2.5" />
  </svg>
)

const ScanIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" />
    <path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const DownloadIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const SpinnerIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
)

const UploadIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
)

// ── Tool list ──────────────────────────────────────────────────────────────────

const TOOLS = [
  { id: 'blur',   name: '블러 처리',      shortName: '블러',     Icon: BlurIcon },
  { id: 'mosaic', name: '모자이크 처리',   shortName: '모자이크', Icon: MosaicIcon },
  { id: 'emoji',  name: '이모티콘 가리기', shortName: '이모티콘', Icon: EmojiIcon },
  { id: 'auto',   name: '자동 감지',      shortName: '자동 감지', Icon: ScanIcon },
]

// ── Types ──────────────────────────────────────────────────────────────────────

export interface ImageItem {
  preview: string  // full data URL
  mimeType: string
  name: string
}

const MAX_DIRECT_BYTES = 3 * 1024 * 1024
const IMAGE_EXT = /\.(jpe?g|png|gif|webp|bmp|svg|heic|heif|avif)$/i

function compressToFit(file: File): Promise<ImageItem> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file)
    const img = new window.Image()
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('load')) }
    img.onload = () => {
      URL.revokeObjectURL(url)
      const MAX_DIM = 2048
      let w = img.naturalWidth, h = img.naturalHeight
      if (w > MAX_DIM || h > MAX_DIM) {
        const s = MAX_DIM / Math.max(w, h)
        w = Math.round(w * s); h = Math.round(h * s)
      }
      const canvas = document.createElement('canvas')
      canvas.width = w; canvas.height = h
      const ctx = canvas.getContext('2d')
      if (!ctx) { reject(new Error('canvas')); return }
      ctx.drawImage(img, 0, 0, w, h)
      let q = 0.85, dataUrl = canvas.toDataURL('image/jpeg', q)
      while (dataUrl.length > 3_800_000 && q > 0.3) {
        q = Math.round((q - 0.1) * 10) / 10
        dataUrl = canvas.toDataURL('image/jpeg', q)
      }
      resolve({ preview: dataUrl, mimeType: 'image/jpeg', name: file.name })
    }
    img.src = url
  })
}

interface SubmitData {
  images: ImageItem[]
  prompt: string
  tool: string | null
}

export interface ResultItem {
  imageBase64: string
  mimeType: string
  name: string
}

// ── PromptBox ──────────────────────────────────────────────────────────────────

interface PromptBoxProps {
  loading: boolean
  onSubmitData: (data: SubmitData) => void
  placeholder?: string
  images: ImageItem[]
  setImages: React.Dispatch<React.SetStateAction<ImageItem[]>>
}

function PromptBox({ loading, onSubmitData, placeholder, images, setImages }: PromptBoxProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const dragCounter = React.useRef(0)

  const [value, setValue] = React.useState('')
  const [previewDialogSrc, setPreviewDialogSrc] = React.useState<string | null>(null)
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const [toolsOpen, setToolsOpen] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)

  React.useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [value])

  const loadFiles = (files: FileList | File[]) => {
    const valid = Array.from(files).filter(
      f => f.type.startsWith('image/') || IMAGE_EXT.test(f.name)
    )
    const slots = Math.max(0, 10 - images.length)
    const toLoad = valid.slice(0, slots)
    if (toLoad.length === 0) return
    Promise.all(
      toLoad.map(file =>
        file.size <= MAX_DIRECT_BYTES
          ? new Promise<ImageItem>(resolve => {
              const reader = new FileReader()
              reader.onloadend = () => resolve({ preview: reader.result as string, mimeType: file.type || 'image/jpeg', name: file.name })
              reader.readAsDataURL(file)
            })
          : compressToFit(file)
      )
    ).then(newImages => setImages(prev => [...prev, ...newImages]))
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) loadFiles(e.target.files)
    e.target.value = ''
  }

  const containerRef = React.useRef<HTMLDivElement>(null)
  const loadFilesRef = React.useRef(loadFiles)
  loadFilesRef.current = loadFiles

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onDragEnter = (e: DragEvent) => {
      e.preventDefault()
      dragCounter.current++
      setIsDragging(true)
    }
    const onDragLeave = (e: DragEvent) => {
      e.preventDefault()
      dragCounter.current--
      if (dragCounter.current === 0) setIsDragging(false)
    }
    const onDragOver = (e: DragEvent) => { e.preventDefault() }
    const onDrop = (e: DragEvent) => {
      e.preventDefault()
      dragCounter.current = 0
      setIsDragging(false)
      if (e.dataTransfer?.files.length) loadFilesRef.current(e.dataTransfer.files)
    }
    el.addEventListener('dragenter', onDragEnter)
    el.addEventListener('dragleave', onDragLeave)
    el.addEventListener('dragover', onDragOver)
    el.addEventListener('drop', onDrop)
    return () => {
      el.removeEventListener('dragenter', onDragEnter)
      el.removeEventListener('dragleave', onDragLeave)
      el.removeEventListener('dragover', onDragOver)
      el.removeEventListener('drop', onDrop)
    }
  }, [])

  const removeImage = (e: React.MouseEvent, idx: number) => {
    e.stopPropagation()
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

  const submit = () => {
    if ((images.length === 0 && !value.trim()) || loading) return
    onSubmitData({ images, prompt: value, tool: selectedTool })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && hasContent && !loading) {
      e.preventDefault()
      submit()
    }
  }

  const hasContent = value.trim().length > 0 || images.length > 0
  const activeTool = TOOLS.find(t => t.id === selectedTool)

  return (
    <form onSubmit={(e) => { e.preventDefault(); submit() }}>
      <Dialog open={!!previewDialogSrc} onOpenChange={(open) => { if (!open) setPreviewDialogSrc(null) }}>
        <div
          className="relative overflow-hidden flex flex-col rounded-[28px] p-2 cursor-text"
          style={{
            backgroundColor: '#232323',
            border: isDragging ? '1px solid rgba(139,92,246,0.6)' : '1px solid rgba(255,255,255,0.07)',
            boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
            transition: 'border-color 0.15s',
          }}
          ref={containerRef}
        >
          <BorderBeam size={110} duration={7} colorFrom="#8b5cf6" colorTo="#3b82f6" borderWidth={1.5} />
          <BorderBeam size={110} duration={7} delay={3.5} colorFrom="#3b82f6" colorTo="#8b5cf6" borderWidth={1.5} reverse />
          <input ref={fileInputRef} type="file" accept="image/*,image/heic,image/heif" multiple onChange={handleFile} className="hidden" />

          {/* Drag overlay */}
          {isDragging && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-[28px] pointer-events-none" style={{ backgroundColor: 'rgba(139,92,246,0.1)' }}>
              <UploadIcon className="h-7 w-7" style={{ color: '#a78bfa' }} />
              <p className="text-sm" style={{ color: '#a78bfa' }}>이미지를 여기에 놓으세요</p>
            </div>
          )}

          {/* Image thumbnails */}
          {images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto px-1 pt-1 pb-0.5" style={{ scrollbarWidth: 'none' }}>
              {images.map((img, idx) => (
                <div key={idx} className="relative shrink-0">
                  <button type="button" onClick={() => setPreviewDialogSrc(img.preview)} className="relative block h-14 w-14 rounded-2xl overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={img.preview} alt={img.name} className="h-full w-full object-cover" />
                  </button>
                  <button
                    type="button"
                    onClick={(e) => removeImage(e, idx)}
                    aria-label="이미지 제거"
                    className="absolute right-1.5 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:opacity-80"
                    style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: 'white' }}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder ?? '어떻게 처리할지 설명해주세요...'}
            className="w-full resize-none border-0 bg-transparent p-3 focus:ring-0 focus-visible:outline-none min-h-12 placeholder:text-white/30"
            style={{ color: 'rgba(255,255,255,0.88)', caretColor: 'white' }}
          />

          {/* Toolbar */}
          <div className="mt-0.5 p-1 pt-0">
            <TooltipProvider delayDuration={120}>
              <div className="flex items-center gap-1.5">

                {/* Attach images */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      <PlusIcon className="h-5 w-5" />
                      <span className="sr-only">이미지 첨부</span>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" showArrow>이미지 첨부 (여러 장 가능)</TooltipContent>
                </Tooltip>

                {/* Tools popover */}
                <Popover open={toolsOpen} onOpenChange={setToolsOpen}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm transition-colors hover:bg-white/10"
                          style={{ color: 'rgba(255,255,255,0.6)' }}
                        >
                          <Settings2Icon className="h-4 w-4 shrink-0" />
                          {!selectedTool && <span>처리 방식</span>}
                        </button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow>처리 방식 선택</TooltipContent>
                  </Tooltip>

                  <PopoverContent side="top" align="start">
                    <div className="flex flex-col gap-0.5">
                      {TOOLS.map(({ id, name, Icon }) => (
                        <button
                          key={id}
                          type="button"
                          onClick={() => { setSelectedTool(id); setToolsOpen(false) }}
                          className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-sm text-left transition-colors hover:bg-white/10"
                          style={{ color: 'rgba(255,255,255,0.82)' }}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {name}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Active tool badge */}
                {activeTool && (
                  <>
                    <div className="h-4 w-px shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
                    <button
                      type="button"
                      onClick={() => setSelectedTool(null)}
                      className="flex h-8 items-center gap-1.5 rounded-full px-2.5 text-sm transition-colors hover:bg-white/10 cursor-pointer shrink-0"
                      style={{ color: '#99ceff' }}
                    >
                      <activeTool.Icon className="h-4 w-4" />
                      {activeTool.shortName}
                      <XIcon className="h-3.5 w-3.5" />
                    </button>
                  </>
                )}

                {/* Image count badge */}
                {images.length > 0 && (
                  <>
                    <div className="h-4 w-px shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} />
                    <span
                      className="text-xs px-2 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.45)' }}
                    >
                      {images.length}장
                    </span>
                  </>
                )}

                {/* Right: mic + send */}
                <div className="ml-auto flex items-center gap-1.5">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:bg-white/10"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                      >
                        <MicIcon className="h-5 w-5" />
                        <span className="sr-only">음성 입력</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow>음성 입력</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="submit"
                        disabled={!hasContent || loading}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors disabled:pointer-events-none"
                        style={{
                          backgroundColor: hasContent && !loading ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)',
                          color: hasContent && !loading ? '#181818' : 'rgba(255,255,255,0.25)',
                        }}
                      >
                        {loading
                          ? <SpinnerIcon className="h-4 w-4 animate-spin" />
                          : <SendIcon className="h-5 w-5" />
                        }
                        <span className="sr-only">전송</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="top" showArrow>전송</TooltipContent>
                  </Tooltip>
                </div>

              </div>
            </TooltipProvider>
          </div>
        </div>

        {/* Full-size preview dialog */}
        <DialogContent>
          {previewDialogSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewDialogSrc} alt="Full size" className="w-full max-h-[90vh] object-contain rounded-[24px]" style={{ height: 'auto' }} />
          )}
        </DialogContent>
      </Dialog>
    </form>
  )
}

// ── PromptArea (exported) ─────────────────────────────────────────────────────

const StarIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" {...p}>
    <path d="M6.5 1L7.8 4.7L11.5 6L7.8 7.3L6.5 11L5.2 7.3L1.5 6L5.2 4.7L6.5 1Z" fill="currentColor" />
  </svg>
)

const TOOL_MESSAGES: Record<string, string> = {
  blur:   '블러 처리가 완료되었습니다.',
  mosaic: '모자이크 처리가 완료되었습니다.',
  emoji:  '이모티콘 처리가 완료되었습니다.',
  auto:   '얼굴 가리기가 완료되었습니다.',
}

function buildCompletionText(data: SubmitData): string {
  if (data.tool && TOOL_MESSAGES[data.tool]) return TOOL_MESSAGES[data.tool]

  const t = data.prompt.toLowerCase()
  if (t.includes('블러') || t.includes('blur') || t.includes('흐림') || t.includes('흐리')) return '블러 처리가 완료되었습니다.'
  if (t.includes('모자이크') || t.includes('mosaic') || t.includes('픽셀')) return '모자이크 처리가 완료되었습니다.'
  if (t.includes('이모티콘') || t.includes('emoji') || t.includes('스티커')) return '이모티콘 처리가 완료되었습니다.'

  return '얼굴 가리기가 완료되었습니다.'
}

export function PromptArea({ onNewResults, addImageRef }: {
  onNewResults?: (results: ResultItem[]) => void
  addImageRef?: { current: ((item: ImageItem) => void) | null }
} = {}) {
  const { refreshCredits } = useAuth()
  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState<{ current: number; total: number } | null>(null)
  const [results, setResults] = React.useState<ResultItem[]>([])
  const [completionText, setCompletionText] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [resetKey, setResetKey] = React.useState(0)
  const [images, setImages] = React.useState<ImageItem[]>([])
  const [pricingOpen, setPricingOpen] = React.useState(false)

  React.useEffect(() => {
    if (!addImageRef) return
    addImageRef.current = (item: ImageItem) => {
      setImages(prev => prev.length >= 10 ? prev : [...prev, item])
    }
    return () => { addImageRef.current = null }
  }, [addImageRef])

  const isActive = loading || results.length > 0 || !!error

  const handleSubmitData = async (data: SubmitData) => {
    setLoading(true)
    setError(null)
    setResults([])
    setProgress(data.images.length > 1 ? { current: 0, total: data.images.length } : null)

    try {
      if (data.images.length === 0) {
        // text-only request
        const res = await fetch('/api/edit-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageBase64: null, mimeType: 'image/jpeg', prompt: data.prompt, tool: data.tool }),
        })
        const json = await res.json()
        if (res.status === 402) { setPricingOpen(true); return }
        if (!res.ok) throw new Error(json.error ?? '처리 중 오류가 발생했습니다.')
        if (json.imageBase64) {
          const singleResult = [{ imageBase64: json.imageBase64, mimeType: json.mimeType ?? 'image/png', name: 'result.png' }]
          setResults(singleResult)
          onNewResults?.(singleResult)
        }
      } else {
        const newResults: ResultItem[] = []
        for (let i = 0; i < data.images.length; i++) {
          if (data.images.length > 1) setProgress({ current: i + 1, total: data.images.length })
          const img = data.images[i]
          const res = await fetch('/api/edit-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              imageBase64: img.preview.split(',')[1],
              mimeType: img.mimeType,
              prompt: data.prompt,
              tool: data.tool,
              name: img.name,
            }),
          })
          const json = await res.json()
          if (res.status === 402) { setPricingOpen(true); return }
          if (!res.ok) throw new Error(json.error ?? '처리 중 오류가 발생했습니다.')
          if (json.imageBase64) {
            const baseName = img.name.replace(/\.[^.]+$/, '')
            newResults.push({
              imageBase64: json.imageBase64,
              mimeType: json.mimeType ?? 'image/png',
              name: `${baseName}_blurred.png`,
            })
          }
        }
        setResults(newResults)
        onNewResults?.(newResults)
      }

      setCompletionText(buildCompletionText(data))
      setResetKey(k => k + 1)
      setImages([])
    } catch (err) {
      setError(err instanceof Error ? err.message : '처리 중 오류가 발생했습니다.')
    } finally {
      setLoading(false)
      setProgress(null)
      refreshCredits()
    }
  }

  const handleDownload = (idx: number) => {
    const r = results[idx]
    if (!r) return
    const a = document.createElement('a')
    a.href = `data:${r.mimeType};base64,${r.imageBase64}`
    a.download = r.name
    a.click()
  }

  const handleDownloadAll = async () => {
    for (const r of results) {
      const a = document.createElement('a')
      a.href = `data:${r.mimeType};base64,${r.imageBase64}`
      a.download = r.name
      a.click()
      await new Promise(resolve => setTimeout(resolve, 120))
    }
  }

  return (
    <>
    <div className="w-full max-w-2xl flex flex-col items-center gap-6 px-4">

      {/* Heading — fades out when processing starts */}
      <AnimatePresence>
        {!isActive && (
          <motion.div
            key="heading"
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm"
              style={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.45)',
              }}
            >
              <StarIcon />
              AI 기반 얼굴 자동 인식
            </div>

            <h1
              className="text-center font-bold leading-tight tracking-tighter"
              style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', color: 'rgba(255,255,255,0.92)' }}
            >
              Face Blur
            </h1>

            <p
              className="text-center text-base sm:text-lg leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.38)' }}
            >
              사진을 올리고 얼굴을 어떻게 가릴지 알려주세요.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status area */}
      <AnimatePresence mode="wait">

        {loading && <LoadingState key="loading" progress={progress ?? undefined} />}

        {/* Error */}
        {error && !loading && (
          <motion.div
            key="error"
            className="w-full flex flex-col items-center gap-4 py-10 rounded-[24px]"
            style={{ backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.18)' }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(239,68,68,0.12)' }}>
              <XIcon className="h-9 w-9" style={{ color: '#f87171' }} />
            </div>
            <div className="flex flex-col items-center gap-1 px-6 text-center">
              <p className="text-sm font-medium" style={{ color: '#fca5a5' }}>처리 중 오류가 발생했습니다</p>
              <p className="text-xs" style={{ color: 'rgba(252,165,165,0.6)' }}>{error}</p>
            </div>
          </motion.div>
        )}

        {/* Results */}
        {results.length > 0 && !loading && (
          <motion.div
            key="results"
            className="w-full flex flex-col gap-3 p-3 rounded-[24px]"
            style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Image grid */}
            <div className={`${results.length === 1 ? 'flex flex-col' : 'grid grid-cols-2 gap-2'} max-w-[80%] mx-auto w-full`}>
              {results.map((result, idx) => (
                <div key={idx} className="relative group rounded-[18px] overflow-hidden">
                  <Image
                    unoptimized
                    src={`data:${result.mimeType};base64,${result.imageBase64}`}
                    alt={`처리된 이미지 ${idx + 1}`}
                    width={1200}
                    height={900}
                    className="w-full object-contain"
                    style={{ height: 'auto', borderRadius: results.length === 1 ? '18px' : undefined }}
                  />
                  {results.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDownload(idx)}
                      className="absolute bottom-2 right-2 flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ backgroundColor: 'rgba(0,0,0,0.6)', color: 'white', backdropFilter: 'blur(4px)' }}
                    >
                      <DownloadIcon className="h-3 w-3" />
                      저장
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-1">
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {results.length > 1 ? `${results.length}장 ${completionText}` : completionText}
              </p>
              <button
                type="button"
                onClick={results.length > 1 ? handleDownloadAll : () => handleDownload(0)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-colors hover:bg-white/10 shrink-0"
                style={{ color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <DownloadIcon className="h-4 w-4" />
                {results.length > 1 ? '모두 다운로드' : '다운로드'}
              </button>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Form */}
      <motion.div
        layout
        className="w-full"
        transition={{ type: 'spring', bounce: 0.18, duration: 0.55 }}
      >
        <PromptBox key={resetKey} loading={loading} onSubmitData={handleSubmitData} images={images} setImages={setImages} />
      </motion.div>

    </div>

    <PricingModal open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </>
  )
}
