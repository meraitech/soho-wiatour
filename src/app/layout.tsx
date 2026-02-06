import { GoogleAnalytics } from '@next/third-parties/google'
import { buildRootMetadata } from '@/features/seo'

export const metadata = buildRootMetadata()

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
      <GoogleAnalytics gaId="G-6J0BXZJNG5" />
    </html>
  )
}
