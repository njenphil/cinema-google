import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"
import { NextAuthProviderWrapper } from "@/components/NextAuthProviderWrapper"
import { Navbar } from "@/components/Navbar"
import ModifiedFooter from "@/components/ModifiedFooter"
import { CinemaContextWrapper } from "@/components/context"
import React from "react"

const inter = Jost({ subsets: ["latin"] })

import TrackingLoggedInUsers from "@/components/TrackingLoggedInUsers"

export const metadata: Metadata = {
  title: "CINEMA | LATEST MOVIES AND SHOWS",
  description: "This is the best platform to get latest shows and movies for your entertainment"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ backgroundColor: "black" }}>
        <CinemaContextWrapper>
          <NextAuthProviderWrapper>
            <main className="for-overflow">
              <TrackingLoggedInUsers />
              <Navbar />
              {children}
              <ModifiedFooter />
            </main>
          </NextAuthProviderWrapper>
        </CinemaContextWrapper>
      </body>
    </html>
  )
}
