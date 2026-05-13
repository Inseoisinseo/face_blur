import type { Metadata } from "next";
import { Geist, Geist_Mono, Indie_Flower } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { UserAvatar } from "@/components/ui/user-avatar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const indieFlower = Indie_Flower({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-indie-flower",
});

export const metadata: Metadata = {
  title: 'Face Blur - AI 얼굴 자동 가리기 | 블러·모자이크·이모티콘',
  description:
    '사진 속 얼굴을 AI가 자동으로 인식해서 블러, 모자이크, 이모티콘으로 가려드립니다. 무료로 시작 가능. Automatically blur, mosaic or cover faces in photos with AI. Free to start.',
  keywords: [
    '얼굴 가리기', '얼굴 블러', '얼굴 모자이크', '사진 얼굴 자동인식',
    '무료 얼굴 블러', '온라인 얼굴 가리기',
    'face blur', 'blur faces in photos', 'face anonymizer',
    'face mosaic', 'hide faces', 'free face blur online',
  ],
  alternates: {
    canonical: 'https://face-blur-ai.vercel.app',
    languages: {
      ko: 'https://face-blur-ai.vercel.app',
      en: 'https://face-blur-ai.vercel.app/en',
    },
  },
  openGraph: {
    title: 'Face Blur - AI 얼굴 자동 가리기',
    description:
      '사진 속 얼굴을 AI가 자동으로 인식해서 블러, 모자이크, 이모티콘으로 가려드립니다.',
    url: 'https://face-blur-ai.vercel.app',
    siteName: 'Face Blur',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Face Blur - AI 얼굴 자동 가리기',
    description:
      '사진 속 얼굴을 AI가 자동으로 인식해서 블러, 모자이크, 이모티콘으로 가려드립니다.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  verification: {
    google: 'qKWlKFHpHTJJx3Uk9rVDGTfw-hcyICaoV4Xe4bDlRpc',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${indieFlower.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <AuthProvider>
            <UserAvatar />
            {children}
          </AuthProvider>
        </body>
    </html>
  );
}
