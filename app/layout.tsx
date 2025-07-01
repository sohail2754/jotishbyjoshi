import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Jyotish Joshi - Vedic Astrology Master | Spiritual Guidance & Cosmic Wisdom",
    template: "%s | Jyotish Joshi - Vedic Astrology",
  },
  description:
    "Expert Vedic astrology consultations, spiritual healing, and cosmic guidance by Jyotish Joshi. Discover your life path through ancient wisdom and personalized astrological insights.",
  keywords: [
    "Vedic astrology",
    "Jyotish Joshi",
    "astrology consultation",
    "birth chart reading",
    "spiritual guidance",
    "cosmic wisdom",
    "horoscope",
    "kundali",
    "marriage compatibility",
    "career guidance",
    "spiritual healing",
    "chakra balancing",
    "practice kundali",
    "astrology classes",
  ],
  authors: [{ name: "Jyotish Joshi" }],
  creator: "Jyotish Joshi",
  publisher: "Jyotish Joshi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://jyotishjoshi.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jyotishjoshi.com",
    title: "Jyotish Joshi - Vedic Astrology Master | Spiritual Guidance",
    description:
      "Expert Vedic astrology consultations and spiritual guidance. Discover your cosmic blueprint with personalized astrological insights.",
    siteName: "Jyotish Joshi - Vedic Astrology",
    images: [
      {
        url: "/placeholder.jpg",
        width: 1200,
        height: 630,
        alt: "Jyotish Joshi - Vedic Astrology Master",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jyotish Joshi - Vedic Astrology Master",
    description: "Expert Vedic astrology consultations and spiritual guidance",
    images: ["/placeholder.jpg"],
    creator: "@jyotishjoshi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#f59e0b" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Jyotish Joshi" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
