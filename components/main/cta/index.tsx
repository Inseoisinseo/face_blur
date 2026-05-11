'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { BorderBeam } from '@/components/ui/border-beam';

function GradientBlob({
  color,
  size,
  style,
  animateX,
  animateY,
  duration,
}: {
  color: string;
  size: number;
  style?: React.CSSProperties;
  animateX: number[];
  animateY: number[];
  duration: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: 'blur(72px)',
        ...style,
      }}
      animate={{ x: animateX, y: animateY }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      }}
    />
  );
}

export function CTASection() {
  return (
    <section className="w-full px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl relative rounded-3xl overflow-hidden">
        <div className="absolute inset-0" style={{ background: '#07070f' }} />

        <GradientBlob
          color="rgba(124, 58, 237, 0.65)"
          size={520}
          style={{ top: '-25%', left: '-12%' }}
          animateX={[0, 35, -15, 0]}
          animateY={[0, 20, -12, 0]}
          duration={13}
        />
        <GradientBlob
          color="rgba(37, 99, 235, 0.55)"
          size={440}
          style={{ bottom: '-25%', right: '-8%' }}
          animateX={[0, -28, 18, 0]}
          animateY={[0, -18, 28, 0]}
          duration={17}
        />
        <GradientBlob
          color="rgba(167, 139, 250, 0.45)"
          size={360}
          style={{ top: '35%', left: '48%', transform: 'translate(-50%, -50%)' }}
          animateX={[0, 45, -22, 0]}
          animateY={[0, -32, 22, 0]}
          duration={21}
        />

        <div className="relative z-10 px-8 py-20 md:py-28 text-center flex flex-col items-center gap-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/60 text-sm font-medium tracking-wide">
            <svg width="12" height="12" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path
                d="M6.5 1L7.8 4.7L11.5 6L7.8 7.3L6.5 11L5.2 7.3L1.5 6L5.2 4.7L6.5 1Z"
                fill="currentColor"
              />
            </svg>
            무료로 시작
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-[2.8rem] font-bold text-white leading-[1.15] tracking-tight max-w-2xl">
            얼굴 보호, 이제
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #a78bfa, #60a5fa)' }}
            >
              몇 초면 충분합니다
            </span>
          </h2>

          <p className="text-white/50 text-base md:text-lg max-w-md leading-relaxed">
            사진을 올리면 AI가 얼굴을 자동으로 감지하고
            <br />
            블러·모자이크·이모티콘으로 처리해 드립니다.
          </p>

          <Button
            size="lg"
            className="mt-2 px-10 h-12 text-base font-semibold bg-white text-[#07070f] hover:bg-white/90 transition-colors cursor-pointer"
            asChild
          >
            <Link href="/auth">무료로 시작하기 →</Link>
          </Button>
        </div>

        <BorderBeam
          colorFrom="#8b5cf6"
          colorTo="#3b82f6"
          duration={8}
          size={120}
          borderWidth={1}
        />
      </div>
    </section>
  );
}
