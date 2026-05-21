import React from 'react'
import { SmoothScrollProvider } from '@/shared/components/provider/SmoothScrollProvider'
import '@/shared/styles/global.css'
import { Footer } from '@/shared/components/layout/Footer'
import { Navbar } from '@/shared/components/layout/Navbar'
import { GoogleAnalytics } from '@next/third-parties/google'
import { buildRootMetadata } from '@/features/seo'

export const metadata = buildRootMetadata()

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
