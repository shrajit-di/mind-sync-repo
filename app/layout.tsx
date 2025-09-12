import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { AuthProvider } from "@/components/auth-provider"
import { ChatbotWidget } from "@/components/chatbot-widget"
import "./globals.css"

export const metadata: Metadata = {
  title: "Mind-Sync - Mental Health Platform for Students",
  description:
    "A safe, supportive digital space for university students to manage their mental well-being with assessments, stress relief activities, and professional support.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <Suspense fallback={null}>{children}</Suspense>
          <ChatbotWidget />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
