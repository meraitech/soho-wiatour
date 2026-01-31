import React from 'react'
import { SmoothScrollProvider } from '@/shared/components/provider/SmoothScrollProvider'
import '@/shared/styles/global.css'
import { Footer } from '@/shared/components/layout/Footer'
import { Navbar } from '@/shared/components/layout/Navbar'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Wiatour',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          <main className="flex flex-col ">
            <Navbar />
            {children}
            <Footer />
          </main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
