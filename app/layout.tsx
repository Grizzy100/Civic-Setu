// ===== Solution 1: Update app/layout.tsx (Recommended) =====
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// Configure Inter font with proper options
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Improves font loading performance
  preload: true,   // Explicitly enable preloading
  fallback: ['system-ui', 'arial'], // Fallback fonts
})

export const metadata: Metadata = {
  title: 'Civic Sethu - Building Better Communities',
  description: 'Report issues, earn Karma, and make a difference in Jharkhand.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}