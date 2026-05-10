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

// ── Shared Face Parts (SVG fragments) ─────────────────────────────────────────

function FaceFeatures() {
  return (
    <>
      <ellipse cx="90" cy="100" rx="58" ry="65" fill="#e2aa7a" />
      <path d="M56 78 Q68 72 80 78" stroke="#4a3020" fill="none" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M100 78 Q112 72 124 78" stroke="#4a3020" fill="none" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="68" cy="93" rx="10" ry="11" fill="white" />
      <ellipse cx="112" cy="93" rx="10" ry="11" fill="white" />
      <circle cx="70" cy="94" r="6" fill="#2a1508" />
      <circle cx="114" cy="94" r="6" fill="#2a1508" />
      <circle cx="72" cy="92" r="2" fill="white" />
      <circle cx="116" cy="92" r="2" fill="white" />
      <ellipse cx="68" cy="109" rx="5" ry="2.5" fill="#e07850" opacity="0.4" />
      <ellipse cx="112" cy="109" rx="5" ry="2.5" fill="#e07850" opacity="0.4" />
      <path d="M86 109 Q90 117 94 109" stroke="#a86838" fill="none" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M74 124 Q90 139 106 124" stroke="#b87048" fill="none" strokeWidth="2.5" strokeLinecap="round" />
    </>
  );
}

function FaceHair() {
  return (
    <>
      <path d="M32 82 Q37 20 90 20 Q143 20 148 82 Q138 44 90 42 Q42 44 32 82Z" fill="#261410" />
      <path d="M32 82 Q27 100 31 116 Q35 90 45 84Z" fill="#261410" />
      <path d="M148 82 Q153 100 149 116 Q145 90 135 84Z" fill="#261410" />
    </>
  );
}

// ── Effect Illustrations ──────────────────────────────────────────────────────

function BlurIllustration() {
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" className="w-32 h-40 md:w-36 md:h-44">
      <defs>
        <filter id="f-blur" x="-15%" y="-15%" width="130%" height="130%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <path d="M5 220 Q5 172 90 162 Q175 172 175 220Z" fill="#3730a3" />
      <rect x="74" y="150" width="32" height="22" rx="8" fill="#e2aa7a" />
      <g filter="url(#f-blur)">
        <FaceFeatures />
      </g>
      <FaceHair />
    </svg>
  );
}

function MosaicIllustration() {
  const S = 13;
  const ox = 38;
  const oy = 46;
  const cols = 8;
  const rows = 9;
  const palette = [
    '#e2aa7a', '#d89860', '#eab888', '#d89860', '#dca070',
    '#e8b280', '#d4986c', '#e4ac78', '#daa06c', '#e0a876',
    '#cc9060', '#e8b080', '#d6a070', '#e6ae7c', '#da9e68',
  ];

  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" className="w-32 h-40 md:w-36 md:h-44">
      <defs>
        <clipPath id="cp-mosaic">
          <ellipse cx="90" cy="100" rx="55" ry="62" />
        </clipPath>
      </defs>
      <path d="M5 220 Q5 172 90 162 Q175 172 175 220Z" fill="#1e3a8a" />
      <rect x="74" y="150" width="32" height="22" rx="8" fill="#e2aa7a" />
      <FaceFeatures />
      <g clipPath="url(#cp-mosaic)">
        {Array.from({ length: cols * rows }, (_, i) => {
          const c = i % cols;
          const r = Math.floor(i / cols);
          return (
            <rect
              key={i}
              x={ox + c * S}
              y={oy + r * S}
              width={S - 1.5}
              height={S - 1.5}
              fill={palette[(c * 3 + r * 5) % palette.length]}
            />
          );
        })}
      </g>
      <FaceHair />
    </svg>
  );
}

function EmojiIllustration() {
  return (
    <svg viewBox="0 0 180 220" xmlns="http://www.w3.org/2000/svg" className="w-32 h-40 md:w-36 md:h-44">
      <path d="M5 220 Q5 172 90 162 Q175 172 175 220Z" fill="#065f46" />
      <rect x="74" y="150" width="32" height="22" rx="8" fill="#e2aa7a" />
      <FaceFeatures />
      <FaceHair />
      <text x="90" y="100" textAnchor="middle" dominantBaseline="central" fontSize="72">😊</text>
    </svg>
  );
}

// ── Demo Cards ────────────────────────────────────────────────────────────────

type DemoCardData = {
  label: string;
  tag: string;
  gradient: string;
  Illustration: React.FC;
};

const DEMO_CARDS: DemoCardData[] = [
  {
    label: 'Blur',
    tag: '부드러운 블러',
    gradient: 'linear-gradient(160deg, #1e1b4b 0%, #312e81 100%)',
    Illustration: BlurIllustration,
  },
  {
    label: 'Mosaic',
    tag: '모자이크 처리',
    gradient: 'linear-gradient(160deg, #0c1a3a 0%, #1e3a8a 100%)',
    Illustration: MosaicIllustration,
  },
  {
    label: 'Emoji',
    tag: '이모티콘 가리기',
    gradient: 'linear-gradient(160deg, #022c22 0%, #065f46 100%)',
    Illustration: EmojiIllustration,
  },
];

function DemoCard({ data }: { data: DemoCardData }) {
  const { label, tag, gradient, Illustration } = data;
  return (
    <div
      className="w-full h-full rounded-3xl border-2 border-white/10 shadow-2xl flex flex-col overflow-hidden"
      style={{ background: gradient }}
    >
      <div className="px-4 pt-4">
        <span className="inline-flex px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-semibold tracking-wider border border-white/20">
          {label}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <Illustration />
      </div>
      <div className="px-4 pb-4 text-center">
        <p className="text-white/90 text-sm font-semibold">{tag}</p>
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
          {/* Badge */}
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
            블러, 모자이크, 이모티콘 중 원하는 방식으로 가려보세요.
          </p>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="px-8 h-12 text-base" asChild>
            <Link href="/auth">무료로 시작하기</Link>
          </Button>
          <Button size="lg" variant="outline" className="px-8 h-12 text-base">
            예시 보기
          </Button>
        </div>

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
                  <DemoCard data={card} />
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
