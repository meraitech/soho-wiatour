import React from 'react'
import './styles.css'
import { SmoothScrollProvider } from '@/shared/components/provider/SmoothScrollProvider'

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
