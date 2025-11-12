import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Orbyte - Orchestrated Byte Environment',
  description: 'AI-powered cloud compliance and sustainability platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

