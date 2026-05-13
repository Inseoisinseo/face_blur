import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type FeatureCard = {
  src: string;
  alt: string;
  tag: string;
  title: string;
  description: string;
  accent: string;
  tagStyle: { color: string; backgroundColor: string };
};

const FEATURES: FeatureCard[] = [
  {
    src: '/main/1.jpg',
    alt: 'AI 얼굴 자동 인식 블러 처리 예시 — 단체 사진 속 배경 인물 얼굴 블러(face blur)',
    tag: '단체 사진',
    title: '셀피도 안심하고 공유',
    description:
      '찍힌 인원이 아무리 많아도 걱정 마세요. 원하는 얼굴만 선명하게 남기고 배경 속 모든 얼굴은 자동으로 블러 처리합니다.',
    accent: '#8b5cf6',
    tagStyle: { color: '#8b5cf6', backgroundColor: 'rgba(139, 92, 246, 0.15)' },
  },
  {
    src: '/main/2.jpg',
    alt: 'AI 얼굴 자동 인식 블러 처리 예시 — 공공장소 거리 사진 얼굴 모자이크(face mosaic)',
    tag: '공공장소',
    title: '길거리 사진도 안전하게',
    description:
      '거리에서 찍은 인물 사진 배경 속 지나가는 사람들까지 AI가 모두 감지합니다. 의도치 않은 개인정보 노출을 차단하세요.',
    accent: '#3b82f6',
    tagStyle: { color: '#3b82f6', backgroundColor: 'rgba(59, 130, 246, 0.15)' },
  },
  {
    src: '/main/3.jpg',
    alt: 'AI 얼굴 자동 인식 블러 처리 예시 — 군중 속 얼굴 가리기(face anonymizer)',
    tag: '군중 속 주인공',
    title: '수십 명 속 나만 선명하게',
    description:
      '수십 명이 밀집한 교차로에서도 AI가 주인공만 정확하게 구별합니다. 단 몇 초 만에 모든 배경 얼굴을 깔끔하게 처리합니다.',
    accent: '#10b981',
    tagStyle: { color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.15)' },
  },
];

function FeatureCard({ card }: { card: FeatureCard }) {
  return (
    <div className="group relative flex flex-col rounded-3xl overflow-hidden border border-foreground/10 bg-foreground/[0.03] hover:border-foreground/20 transition-colors duration-300">
      <div className="relative w-full h-64 sm:h-72 overflow-hidden">
        <Image
          src={card.src}
          alt={card.alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col gap-2.5 p-5 sm:p-6">
        <span
          className="self-start text-xs font-semibold px-2.5 py-1 rounded-full"
          style={card.tagStyle}
        >
          {card.tag}
        </span>
        <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
          {card.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
      </div>
    </div>
  );
}

interface FeaturesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FeaturesSection({ className, ...props }: FeaturesProps) {
  return (
    <section
      id="features"
      className={cn(
        'relative w-full py-24 px-4 bg-background text-foreground overflow-hidden',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none" aria-hidden="true">
        <div className="absolute left-[-15%] top-[5%] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(139,92,246,0.35),rgba(255,255,255,0))]" />
        <div className="absolute right-[-15%] bottom-[5%] h-[450px] w-[450px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(59,130,246,0.35),rgba(255,255,255,0))]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-muted-foreground">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path
                d="M6.5 1L7.8 4.7L11.5 6L7.8 7.3L6.5 11L5.2 7.3L1.5 6L5.2 4.7L6.5 1Z"
                fill="currentColor"
              />
            </svg>
            기능 소개
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter max-w-2xl leading-[1.1]">
            원하는 얼굴만 남기고,{' '}
            <br className="hidden sm:block" />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}
            >
              나머지는 자동으로
            </span>
          </h2>

          <p className="max-w-lg text-muted-foreground md:text-lg leading-relaxed">
            어떤 장소에서 찍은 사진이든 상관없습니다.
            <br />
            AI가 모든 얼굴을 감지하고 원하는 방식으로 처리해드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {FEATURES.map((card) => (
            <FeatureCard key={card.src} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
