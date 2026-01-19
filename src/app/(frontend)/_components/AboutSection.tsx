import { Button } from '@/shared/components/ui/Button'
import { Container } from '@/shared/components/ui/Container'
import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { MARGIN_CONTAINER } from '@/shared/constants/style/margin'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

export const AboutSection = () => {
  return (
    <section className={MARGIN_CONTAINER}>
      <Container className="grid md:grid-cols-2 gap-8">
        {/* left  */}
        <div className="flex flex-col justify-between items-start gap-10 md:max-w-100">
          <div className="flex flex-col gap-6 items-start">
            <TitleSmallWithIcon text="Tentang Kami" icon={faBuilding} />
            <TypographyH2 className="mt-2">Partner Perjalanan yang Anda Percaya</TypographyH2>
            <TypographyP>
              Wiatour adalah agen tour & travel yang berkomitmen menghadirkan perjalanan yang aman,
              terencana, dan berkesan. Kami melayani berbagai kebutuhan perjalanan—mulai dari paket
              wisata, tiket transportasi, hingga layanan perjalanan khusus—dengan standar pelayanan
              profesional.
            </TypographyP>
          </div>
          <Button variant="monocrome_black">Tentang Kami</Button>
        </div>

        {/* right  */}
        <div className="bg-muted border">
          <img
            src="/brand/logo-mark.svg"
            alt=""
            className="object-cover md:aspect-6/7 aspect-4/3 duration-300"
          />
        </div>
      </Container>
    </section>
  )
}
