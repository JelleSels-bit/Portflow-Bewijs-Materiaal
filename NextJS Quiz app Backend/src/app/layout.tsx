import type React from 'react'
import {Analytics} from '@vercel/analytics/next'
import './globals.css'
import Navbar from '@/components/Navbar/navbar'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <Navbar />
        {children}

        <Analytics />
      </body>
    </html>
  )
}
