import './globals.css'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Nav from './nav'
import { ProductiveAuth } from '../lib/Productive'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Productive IO Analytics',
  description: 'A modern Productive.io analytics dashboard for sprint stats, burndown charts and more...',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-50 dark:bg-black">
      <body className={inter.className}>
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <ProductiveAuth />
      </body>
    </html>
  )
}
