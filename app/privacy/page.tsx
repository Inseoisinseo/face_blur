import Link from 'next/link'

function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path
        d="M6.5 1L11 3V7C11 9.5 9 11.5 6.5 12C4 11.5 2 9.5 2 7V3L6.5 1Z"
        fill="currentColor"
        opacity="0.8"
      />
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

export default function PrivacyPage() {
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
            <ShieldIcon />
            개인정보처리방침
          </div>
          <h1 className="text-3xl font-bold tracking-tighter leading-[1.1]">
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, #8b5cf6, #3b82f6)' }}
            >
              FaceBlur
            </span>
            의 개인정보 보호
          </h1>
          <p className="text-sm text-muted-foreground">
            최종 업데이트: 2025년 5월 1일
          </p>
        </div>

        {/* Content Card */}
        <div className="w-full rounded-3xl border border-foreground/10 bg-foreground/[0.03] backdrop-blur-sm p-8 space-y-8">
          <Section title="1. 개요">
            <p>
              FaceBlur(이하 "서비스")는 사용자의 개인정보를 소중히 여기며, 관련 법령에 따라 이를 보호합니다.
              본 방침은 서비스 이용 과정에서 수집·이용·보관·파기되는 개인정보의 처리 방식을 안내합니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="2. 수집하는 개인정보">
            <p>서비스는 다음 정보를 수집합니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>Google OAuth 인증을 통한 이름, 이메일 주소, 프로필 사진 URL</li>
              <li>업로드하신 이미지 파일 (처리 후 즉시 삭제됨, 아래 참고)</li>
              <li>서비스 이용 기록 — 처리 횟수, 사용 플랜, 결제 내역</li>
              <li>기기 및 접속 정보 — IP 주소, 브라우저 종류, 접속 일시</li>
            </ul>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="3. 이미지 데이터 처리">
            <p>
              업로드된 이미지는 AI 얼굴 처리(블러·모자이크·이모티콘)를 위해 Google Gemini API로 전송됩니다.
              처리가 완료되면 원본 이미지는 즉시 파기되며, 결과 이미지만 사용자의 기기에 저장됩니다.
            </p>
            <p>
              서비스는 사용자의 이미지를 마케팅, 모델 학습, 제3자 제공 등의 목적으로 보관하거나 활용하지 않습니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="4. 개인정보의 이용 목적">
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>서비스 제공 및 계정 관리</li>
              <li>크레딧 및 구독 플랜 관리 (Polar.sh 결제 연동)</li>
              <li>고객 지원 및 서비스 개선</li>
              <li>법적 의무 이행 및 분쟁 해결</li>
            </ul>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="5. 개인정보의 제3자 제공">
            <p>서비스는 다음 경우에 한해 개인정보를 제3자와 공유합니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>
                <span className="text-foreground/70 font-medium">Supabase</span> — 인증 및 데이터베이스 호스팅
              </li>
              <li>
                <span className="text-foreground/70 font-medium">Google Gemini API</span> — 이미지 AI 처리 (이미지 전송 후 즉시 삭제)
              </li>
              <li>
                <span className="text-foreground/70 font-medium">Polar.sh</span> — 결제 처리 및 구독 관리
              </li>
              <li>법령에 의거하거나 수사기관의 적법한 요청이 있는 경우</li>
            </ul>
            <p>위 목적 외에 사전 동의 없이 개인정보를 외부에 제공하지 않습니다.</p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="6. 개인정보의 보유 및 파기">
            <p>
              계정 정보는 회원 탈퇴 시점까지 보유하며, 탈퇴 즉시 파기합니다.
              단, 관련 법령에 의해 보존이 필요한 경우 해당 기간 동안 안전하게 보관 후 파기합니다.
            </p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>전자상거래 기록: 5년 (전자상거래법)</li>
              <li>소비자 불만 기록: 3년 (전자상거래법)</li>
              <li>접속 로그: 3개월 (통신비밀보호법)</li>
            </ul>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="7. 사용자의 권리">
            <p>사용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
            <ul className="list-disc list-inside space-y-1 pl-2">
              <li>개인정보 열람, 정정, 삭제 요청</li>
              <li>개인정보 처리 정지 요청</li>
              <li>계정 삭제 및 서비스 탈퇴</li>
            </ul>
            <p>
              권리 행사를 원하시면 아래 이메일로 문의해 주세요. 요청일로부터 10일 이내에 처리합니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="8. 쿠키 및 추적 기술">
            <p>
              서비스는 사용자 세션 유지를 위해 쿠키(Cookie)를 사용합니다.
              브라우저 설정을 통해 쿠키를 거부할 수 있으나, 일부 기능이 제한될 수 있습니다.
            </p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="9. 개인정보 보호책임자">
            <p>개인정보 처리에 관한 문의 및 불만은 아래 연락처로 접수해 주세요.</p>
            <p className="text-foreground/70 font-medium">이메일: sky97040388@gmail.com</p>
          </Section>

          <div className="border-t border-foreground/8" />

          <Section title="10. 방침 변경">
            <p>
              본 방침이 변경될 경우 서비스 내 공지 또는 이메일을 통해 사전에 안내합니다.
              변경 사항은 공지 후 7일이 지난 시점부터 효력이 발생합니다.
            </p>
          </Section>
        </div>

        {/* Footer Links */}
        <div className="flex flex-col items-center gap-3 pb-4">
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:text-foreground transition-colors">
              이용약관
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
