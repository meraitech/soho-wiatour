import { Button } from '@/shared/components/ui/Button'
import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import React from 'react'

export const HeroSection = () => {
  return (
    <section className="w-full h-screen relative flex items-center justify-center">
      <div className="z-5 text-background flex flex-col items-center gap-12 max-w-4xl">
        <TypographyH1 className="text-center">
          Jelajahi Dunia dengan Pengalaman yang Lebih Berarti
        </TypographyH1>
        <div className="flex gap-8">
          <Button>Lihat Paket Tour</Button>
          <Button variant="monocrome">Hubungi Kami</Button>
        </div>
      </div>

      {/* background  */}
      <div className="bg-foreground w-full h-full absolute top-0 left-0" />
    </section>
  )
}
