'use client'

import { motion } from 'motion/react'
import { Component as Loader } from '@/components/ui/loader-3'

interface LoadingStateProps {
  progress?: { current: number; total: number }
}

export function LoadingState({ progress }: LoadingStateProps) {
  const label =
    progress && progress.total > 1
      ? `${progress.current} / ${progress.total} 처리 중...`
      : 'AI가 이미지를 편집하는 중...'

  return (
    <motion.div
      key="loading"
      className="w-full flex flex-col items-center gap-3 py-10 rounded-[24px]"
      style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Loader />
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.38)' }}>{label}</p>
    </motion.div>
  )
}
