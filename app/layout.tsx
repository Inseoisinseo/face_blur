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
  title: "face blur",
  description: "face blur Generater",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
