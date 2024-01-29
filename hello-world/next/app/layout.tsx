import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hello World for Next - Dynamsoft Barcode Reader Sample',
  description: 'Dynamsoft Barcode Reader in a Next Application, helps read barcodes from camera or images.',
  keywords: 'barcodes, camera, images, Next'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
