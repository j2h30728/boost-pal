import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BOOST PAL - 부스트팔",
  description: "부스트팔은 일상적인 기록을 저장하고 응원을 받을 수 있는 서비스입니다.",
  keywords: ["BOOST PAL", "부스트팔", "일상 기록", "동기부여", "챌린지", "daily goals", "motivation", "challenge"],
  metadataBase: new URL("https://boostpal.vercel.app"),
  icons: {
    icon: [
      { url: "/favicons/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/favicon.svg", type: "image/svg+xml" },
      { url: "/favicons/favicon.ico" },
    ],
    shortcut: [{ url: "/favicons/favicon.ico" }],
    apple: [{ url: "/favicons/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/favicons/site.webmanifest",

  openGraph: {
    title: "BOOST PAL - 부스트팔",
    description: "부스트팔에서 일상을 기록하고 응원을 받으세요.",
    url: "https://boostpal.vercel.app",
    siteName: "BOOST PAL",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "BOOST PAL OG Image",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@boostpal",
    title: "BOOST PAL - 부스트팔",
    description: "부스트팔에서 목표를 기록하고 응원을 받으세요.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative bg-white max-w-screen-sm mx-auto`}>{children}</body>
    </html>
  );
}
