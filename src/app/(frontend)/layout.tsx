import React from 'react'
import { SmoothScrollProvider } from '@/shared/components/provider/SmoothScrollProvider'
import '@/shared/styles/global.css'
import { Footer } from '@/shared/components/layout/Footer'
import { Navbar } from '@/shared/components/layout/Navbar'
import { Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata: Metadata = {
  title: {
    template: '%s | Wiatour',
    default: 'Tour Murah & Paket Wisata Hemat',
  },
  description:
    'Cari tour murah? Wiatour menyediakan paket wisata murah, open trip hemat, dan private tour terjangkau ke destinasi favorit Indonesia.',
  metadataBase: new URL('https://wiatour.com'),
}

export default async function Layout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="id">
      <body>
        <SmoothScrollProvider>
          <main className="flex flex-col ">
            <Navbar />
            {children}
            <Footer />
          </main>
        </SmoothScrollProvider>
        <GoogleAnalytics gaId="G-6J0BXZJNG5" />
      </body>
    </html>
  )
}
