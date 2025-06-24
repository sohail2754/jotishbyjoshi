import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import ClientLayout from "./clientLayout"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JotishByJoshi - Vedic Astrology Master | Online Classes & Consultations",
  description:
    "Transform your life through authentic Vedic astrology. Learn from traditional texts with modern teaching methods. Book personalized consultations and join comprehensive astrology courses.",
  keywords:
    "vedic astrology, jyotish, astrology classes, birth chart reading, astrology consultation, online astrology course",
  authors: [{ name: "Joshi", url: "https://jotishbyjoshi.com" }],
  openGraph: {
    title: "JotishByJoshi - Vedic Astrology Master",
    description: "Transform your life through authentic Vedic astrology education and personalized guidance.",
    type: "website",
    locale: "en_US",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'
