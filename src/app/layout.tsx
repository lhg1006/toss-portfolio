import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { GlobalStyles } from "@/styles/GlobalStyles";
import { ToastProvider } from "@/hooks/useToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "토스뱅크 포트폴리오 데모",
  description: "현대적인 핀테크 UI/UX를 구현한 뱅킹 앱 포트폴리오 데모입니다. 포트폴리오 목적으로 제작되었으며 실제 토스뱅크 서비스가 아닙니다.",
  keywords: ["토스뱅크", "포트폴리오", "핀테크", "UI/UX", "React", "Next.js", "뱅킹앱"],
  authors: [{ name: "lhg1006" }],
  creator: "lhg1006",
  publisher: "lhg1006",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <QueryProvider>
          <ToastProvider>
            <GlobalStyles />
            {children}
          </ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
