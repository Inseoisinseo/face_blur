'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// ── Navigation SVGs ───────────────────────────────────────────────────────────

function ArrowLeftSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightSVG() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ── Demo Cards ────────────────────────────────────────────────────────────────

type DemoCardData = {
  label: string;
  tag: string;
  src: string;
  par: string;
};

const DEMO_CARDS: DemoCardData[] = [
  { label: 'Blur',   tag: '부드러운 블러',    src: '/main/1.jpg', par: 'xMidYMin slice' },
  { label: 'Mosaic', tag: '모자이크 처리',    src: '/main/2.jpg', par: 'xMidYMin slice' },
  { label: 'Emoji',  tag: '이모티콘 가리기', src: '/main/3.jpg', par: 'xMidYMid slice' },
];

function PhotoDemoCard({ data }: { data: DemoCardData }) {
  return (
    <div className="w-full h-full rounded-3xl border-2 border-white/10 shadow-2xl overflow-hidden relative">
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <image
          href={data.src}
          x="0" y="0"
          width="100%" height="100%"
          preserveAspectRatio={data.par}
        />
      </svg>

      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 to-transparent pointer-events-none" />

      <div className="absolute top-4 left-4">
        <span className="inline-flex px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wider border border-white/20">
          {data.label}
        </span>
      </div>

      <div className="absolute bottom-4 left-0 right-0 px-4 text-center">
        <p className="text-white/90 text-sm font-semibold">{data.tag}</p>
        <p className="text-white/40 text-xs mt-1">AI 자동 감지</p>
      </div>
    </div>
  );
}

// ── Hero Section ──────────────────────────────────────────────────────────────

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HeroSection({ className, ...props }: HeroProps) {
  const total = DEMO_CARDS.length;
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const handleNext = React.useCallback(() => {
    setCurrentIndex((i) => (i + 1) % total);
  }, [total]);

  const handlePrev = () => {
    setCurrentIndex((i) => (i - 1 + total) % total);
  };

  React.useEffect(() => {
    const t = setInterval(handleNext, 4000);
    return () => clearInterval(t);
  }, [handleNext]);

  return (
    <div
      className={cn(
        'relative w-full min-h-screen flex flex-col items-center justify-center overflow-x-hidden bg-background text-foreground p-4',
        className
      )}
      {...props}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <div className="absolute bottom-0 left-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(128,90,213,0.3),rgba(255,255,255,0))]" />
        <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(0,123,255,0.3),rgba(255,255,255,0))]" />
      </div>

      <div className="z-10 flex w-full flex-col items-center text-center space-y-8 md:space-y-10">
        {/* Header */}
        <div className="space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-muted-foreground">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path
                d="M6.5 1L7.8 4.7L11.5 6L7.8 7.3L6.5 11L5.2 7.3L1.5 6L5.2 4.7L6.5 1Z"
                fill="currentColor"
              />
            </svg>
            AI 기반 얼굴 자동 인식
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter max-w-3xl mx-auto leading-[1.1]">
            얼굴을 감추는{' '}
            <br className="hidden sm:block" />
            가장{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}
            >
              스마트한 방법
            </span>
          </h1>

          <p className="max-w-lg mx-auto text-muted-foreground md:text-lg leading-relaxed">
            사진을 올리면 AI가 얼굴을 자동으로 찾아냅니다.
            <br />
            얼굴 블러·얼굴 모자이크·이모티콘으로 간편하게 얼굴 가리기.
            <br />
            <span className="text-sm opacity-60">face blur · face anonymizer · blur faces online</span>
          </p>
        </div>

        {/* CTA */}
        <Button size="lg" className="px-8 h-12 text-base" asChild>
          <Link href="/auth">무료로 시작하기</Link>
        </Button>

        {/* Carousel */}
        <div className="relative w-full h-[350px] md:h-[430px] flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
            {DEMO_CARDS.map((card, index) => {
              const offset = index - currentIndex;
              let pos = (offset + total) % total;
              if (pos > Math.floor(total / 2)) pos -= total;

              const isCenter = pos === 0;
              const isAdjacent = Math.abs(pos) === 1;

              return (
                <div
                  key={index}
                  className="absolute w-44 h-72 md:w-52 md:h-80 transition-all duration-500 ease-in-out"
                  style={{
                    transform: `translateX(${pos * 52}%) scale(${isCenter ? 1 : 0.82}) rotateY(${pos * -12}deg)`,
                    zIndex: isCenter ? 10 : isAdjacent ? 5 : 1,
                    opacity: isCenter ? 1 : isAdjacent ? 0.45 : 0,
                    filter: isCenter ? 'none' : 'blur(3px)',
                    visibility: Math.abs(pos) > 1 ? 'hidden' : 'visible',
                  }}
                >
                  <PhotoDemoCard data={card} />
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
          <button
            type="button"
            aria-label="이전"
            onClick={handlePrev}
            className="absolute left-2 sm:left-10 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors cursor-pointer"
          >
            <ArrowLeftSVG />
          </button>
          <button
            type="button"
            aria-label="다음"
            onClick={handleNext}
            className="absolute right-2 sm:right-10 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full border border-foreground/20 bg-background/50 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors cursor-pointer"
          >
            <ArrowRightSVG />
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex gap-2 pb-4">
          {DEMO_CARDS.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`슬라이드 ${i + 1}`}
              onClick={() => setCurrentIndex(i)}
              className={cn(
                'h-1.5 rounded-full transition-all duration-300 cursor-pointer',
                i === currentIndex ? 'w-6 bg-foreground' : 'w-1.5 bg-foreground/25'
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
