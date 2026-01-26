import React from 'react'
import { SmoothScrollProvider } from '@/shared/components/provider/SmoothScrollProvider'
import '@/shared/styles/global.css'

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
          <main>{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
