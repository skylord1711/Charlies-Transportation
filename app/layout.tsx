import type { Metadata } from "next"
import { ThemeProvider } from "@/components/ThemeProvider"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import "./globals.css"

export const metadata: Metadata = {
  title: "Charlie's Transportation | Safe & Reliable Transportation Services",
  description:
    "Your trusted private-pay transportation provider in Rahway, NJ. Professional drivers, modern fleet, and personalized service for all your transportation needs.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
