import Link from 'next/link'

function DocumentIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="2" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M4.5 4.5H8.5M4.5 6.5H8.5M4.5 8.5H7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-base font-semibold text-foreground/90">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </section>
  )
}

export default function TermsPage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start bg-background text-foreground overflow-x-hidden px-4 py-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden="true">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-violet-900/30 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-900/30 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-2xl flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground/5 border border-foreground/10 text-sm text-muted-foreground">
            <DocumentIcon />
            이용약관
          </div>
          <h1 className="text-3xl font-bold tracking-tighter leading-[1.1]">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}
            >
              FaceBlur
            </span>{' '}
            서비스 이용약관
          </h1>
          <p className="text-sm text-muted-foreground">
            최종 업데이트: 2025년 5월 1일
          </p>
        </div>

        {/* Content Card */}
        <div className="w-full rounded-3xl border border-foreground/10 bg-foreground/[0.03] backdrop-blur-sm p-8 space-y-8">
          <Section title="1. 총칙">
            <p>
              본 약관은 FaceBlur(이하 "서비스")가 제공하는 AI 얼굴 처리 서비스의 이용 조건 및 절차,
              사용자와 서비스 간의 권리·의무를 규정합니다. 서비스에 가입하거나 이용함으로써 본 약관에
              동의한 것으로 간주됩니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="2. 서비스 설명">
            <p>FaceBlur는 다음 기능을 제공합니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>업로드된 이미지에서 AI를 통한 자동 얼굴 감지</li>
              <li>블러(Blur), 모자이크(Mosaic), 이모티콘(Emoji) 방식의 얼굴 처리</li>
              <li>처리된 이미지 다운로드</li>
              <li>이미지 처리 히스토리 조회</li>
            </ul>
            <p>
              서비스는 Google Gemini API 기반의 AI 기술을 사용하며, 처리 품질은 이미지 해상도·조명·각도
              등에 따라 달라질 수 있습니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="3. 계정 및 가입">
            <p>
              서비스는 Google OAuth를 통한 소셜 로그인만 지원합니다. 사용자는 자신의 계정 정보를
              안전하게 관리할 책임이 있으며, 계정을 타인과 공유하거나 양도할 수 없습니다.
            </p>
            <p>
              부정 이용이 확인된 경우 사전 고지 없이 계정이 정지 또는 삭제될 수 있습니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="4. 크레딧 및 요금제">
            <p>서비스는 다음 요금제를 제공합니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <span className="text-foreground/70 font-medium">Free</span> — 가입 시 기본 크레딧 제공, 이미지 처리 1회당 1크레딧 소비
              </li>
              <li>
                <span className="text-foreground/70 font-medium">Pro ($3/월)</span> — 월간 크레딧 제공, 월초 자동 갱신
              </li>
              <li>
                <span className="text-foreground/70 font-medium">Ultra ($10/월)</span> — 대용량 크레딧 제공, 월초 자동 갱신
              </li>
            </ul>
            <p>
              크레딧은 현금으로 환불되지 않으며, 미사용 크레딧은 다음 달로 이월되지 않습니다.
              요금제 가격은 사전 고지 후 변경될 수 있습니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="5. 결제 및 환불">
            <p>
              결제는 Polar.sh를 통해 처리되며, 신용카드 등 지원 결제 수단을 이용할 수 있습니다.
              구독은 결제일 기준 매월 자동으로 갱신됩니다.
            </p>
            <p>
              구독 취소는 언제든지 가능하며, 취소 시 당월 종료일까지 서비스를 이용할 수 있습니다.
              이미 결제된 구독료는 원칙적으로 환불되지 않습니다. 단, 서비스 오류 등 귀책 사유가
              서비스 측에 있는 경우 개별 협의를 통해 처리합니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="6. 사용자의 의무">
            <p>사용자는 다음 행위를 해서는 안 됩니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>타인의 동의 없이 촬영된 이미지를 업로드하는 행위</li>
              <li>불법 촬영물, 아동·청소년 성착취물 등 위법한 콘텐츠 업로드</li>
              <li>서비스를 자동화 도구(봇, 스크레이퍼 등)로 대량 이용하는 행위</li>
              <li>서비스의 정상적인 운영을 방해하는 행위</li>
              <li>타인의 계정을 도용하거나 허위 정보를 제공하는 행위</li>
            </ul>
            <p>위반 시 계정이 즉시 정지되며 법적 책임을 질 수 있습니다.</p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="7. 지식재산권">
            <p>
              서비스의 소프트웨어, 디자인, 상표, 로고 등 모든 지식재산권은 FaceBlur에 귀속됩니다.
              사용자는 서비스를 통해 처리한 결과 이미지에 대한 권리를 가지며, 서비스는 해당 이미지에
              대한 어떠한 권리도 주장하지 않습니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="8. 서비스 변경 및 중단">
            <p>
              서비스는 운영상·기술상의 이유로 서비스 내용을 변경하거나 일시 중단할 수 있습니다.
              중요한 변경사항은 최소 7일 전에 공지합니다. 단, 긴급 보안 사항 등의 경우 즉시 적용될 수 있습니다.
            </p>
            <p>
              서비스가 영구 종료될 경우 최소 30일 전에 사용자에게 공지합니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="9. 면책 조항">
            <p>
              서비스는 AI 기술의 특성상 100% 정확한 얼굴 감지를 보장하지 않습니다.
              처리 결과가 사용자의 기대에 미치지 못하더라도 이에 대한 손해를 배상하지 않습니다.
            </p>
            <p>
              사용자가 업로드한 이미지의 저작권·초상권 침해 등 법적 문제에 대해 서비스는 책임을 지지 않으며,
              해당 책임은 전적으로 사용자에게 있습니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="10. 약관 변경">
            <p>
              서비스는 관련 법령이나 운영 정책의 변경에 따라 약관을 수정할 수 있습니다.
              변경된 약관은 공지 후 7일이 경과한 시점부터 효력이 발생하며, 사용자가 변경 후에도
              서비스를 계속 이용하면 변경된 약관에 동의한 것으로 간주됩니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="11. 준거법 및 관할">
            <p>
              본 약관은 대한민국 법률에 따라 해석됩니다. 서비스 이용과 관련된 분쟁은 대한민국 법원을
              전속 관할로 합니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="12. 문의">
            <p>약관에 관한 문의 사항은 아래 이메일로 연락해 주세요.</p>
            <p className="text-foreground/70 font-medium">이메일: sky97040388@gmail.com</p>
          </Section>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col items-center gap-3 pb-4">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              개인정보처리방침
            </Link>
            <span className="opacity-30">·</span>
            <Link href="/" className="hover:text-foreground transition-colors">
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
