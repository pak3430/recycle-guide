import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "재활용 가이드 - AI 분리수거 도우미",
  description:
    "사진을 찍으면 AI가 올바른 분리수거 방법을 알려주는 스마트한 재활용 가이드 앱입니다.",
  keywords: "재활용, 분리수거, AI, 환경보호, 폐기물",
  authors: [{ name: "Recycle Guide Team" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
