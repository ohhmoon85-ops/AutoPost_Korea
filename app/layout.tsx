import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AutoPost Korea | 소상공인 SNS 자동화 플랫폼",
  description:
    "AI가 인스타그램·네이버 블로그·카카오채널 게시물을 자동으로 작성하고 예약 발행합니다. 마케터 없이도 전문적인 SNS 운영이 가능합니다.",
  keywords: [
    "소상공인 SNS",
    "인스타그램 자동화",
    "네이버 블로그 자동화",
    "AI 마케팅",
    "SNS 콘텐츠 자동화",
  ],
  openGraph: {
    title: "AutoPost Korea | 소상공인 SNS 자동화 플랫폼",
    description:
      "AI가 인스타그램·네이버 블로그·카카오채널 게시물을 자동으로 작성하고 예약 발행합니다.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
