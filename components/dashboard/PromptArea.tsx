'use client'

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { BorderBeam } from '@/components/ui/border-beam'

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

// ── Tool list ──────────────────────────────────────────────────────────────────

const TOOLS = [
  { id: 'blur',   name: '블러 처리',     shortName: '블러',     Icon: BlurIcon },
  { id: 'mosaic', name: '모자이크 처리',  shortName: '모자이크', Icon: MosaicIcon },
  { id: 'emoji',  name: '이모티콘 가리기', shortName: '이모티콘', Icon: EmojiIcon },
  { id: 'auto',   name: '자동 감지',     shortName: '자동 감지', Icon: ScanIcon },
]

// ── PromptBox ──────────────────────────────────────────────────────────────────

interface PromptBoxProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  onValueChange?: (value: string) => void
}

function PromptBox({ onValueChange, placeholder, ...rest }: PromptBoxProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const [value, setValue] = React.useState('')
  const [imagePreview, setImagePreview] = React.useState<string | null>(null)
  const [selectedTool, setSelectedTool] = React.useState<string | null>(null)
  const [toolsOpen, setToolsOpen] = React.useState(false)
  const [imageDialogOpen, setImageDialogOpen] = React.useState(false)

  React.useLayoutEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value)
    onValueChange?.(e.target.value)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file?.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result as string)
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImagePreview(null)
  }

  const hasContent = value.trim().length > 0 || !!imagePreview
  const activeTool = TOOLS.find(t => t.id === selectedTool)

  return (
    <div
      className="relative overflow-hidden flex flex-col rounded-[28px] p-2 cursor-text"
      style={{
        backgroundColor: '#232323',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 4px 40px rgba(0,0,0,0.4)',
      }}
    >
      <BorderBeam size={110} duration={7} colorFrom="#8b5cf6" colorTo="#3b82f6" borderWidth={1.5} />
      <BorderBeam size={110} duration={7} delay={3.5} colorFrom="#3b82f6" colorTo="#8b5cf6" borderWidth={1.5} reverse />
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />

      {/* Image thumbnail */}
      {imagePreview && (
        <Dialog open={imageDialogOpen} onOpenChange={setImageDialogOpen}>
          <div className="relative mb-1 w-fit px-1 pt-1">
            <button type="button" onClick={() => setImageDialogOpen(true)}>
              <img src={imagePreview} alt="Preview" className="h-14 w-14 rounded-2xl object-cover" />
            </button>
            <button
              type="button"
              onClick={removeImage}
              aria-label="이미지 제거"
              className="absolute right-1.5 top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full transition-colors hover:opacity-80"
              style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: 'white' }}
            >
              <XIcon className="h-3 w-3" />
            </button>
          </div>
          <DialogContent>
            <img src={imagePreview} alt="Full size" className="w-full max-h-[90vh] object-contain rounded-[24px]" />
          </DialogContent>
        </Dialog>
      )}

      {/* Textarea */}
      <textarea
        ref={textareaRef}
        rows={1}
        value={value}
        onChange={handleChange}
        placeholder={placeholder ?? '어떻게 처리할지 설명해주세요...'}
        className="w-full resize-none border-0 bg-transparent p-3 focus:ring-0 focus-visible:outline-none min-h-12 placeholder:text-white/30"
        style={{ color: 'rgba(255,255,255,0.88)', caretColor: 'white' }}
        {...rest}
      />

      {/* Toolbar */}
      <div className="mt-0.5 p-1 pt-0">
        <TooltipProvider delayDuration={120}>
          <div className="flex items-center gap-1.5">

            {/* Attach image */}
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
              <TooltipContent side="top" showArrow>이미지 첨부</TooltipContent>
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
                    disabled={!hasContent}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors disabled:pointer-events-none"
                    style={{
                      backgroundColor: hasContent ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.12)',
                      color: hasContent ? '#181818' : 'rgba(255,255,255,0.25)',
                    }}
                  >
                    <SendIcon className="h-5 w-5" />
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
  )
}

// ── PromptArea (exported) ─────────────────────────────────────────────────────

const StarIcon = (p: React.SVGProps<SVGSVGElement>) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true" {...p}>
    <path d="M6.5 1L7.8 4.7L11.5 6L7.8 7.3L6.5 11L5.2 7.3L1.5 6L5.2 4.7L6.5 1Z" fill="currentColor" />
  </svg>
)

export function PromptArea() {
  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="w-full max-w-2xl flex flex-col items-center gap-10 px-4">
      {/* Heading */}
      <div className="flex flex-col items-center gap-4">
        {/* Badge */}
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

        {/* Main title */}
        <h1
          className="text-center font-bold leading-tight tracking-tighter"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5.5rem)',
            color: 'rgba(255,255,255,0.92)',
          }}
        >
          Face Blur
        </h1>

        {/* Subtitle */}
        <p
          className="text-center text-base sm:text-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.38)' }}
        >
          사진을 올리고 얼굴을 어떻게 가릴지 알려주세요.
        </p>
      </div>

      <form className="w-full" onSubmit={handleSubmit}>
        <PromptBox />
      </form>
    </div>
  )
}
