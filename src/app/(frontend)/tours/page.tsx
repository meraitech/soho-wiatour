import React from 'react'
import id from '@/shared/assets/jsons/id.json'
import CTASection from '@/shared/components/CTASection'
import { HeaderSection } from '@/shared/components/HeaderSection'
import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { Container } from '@/shared/components/provider/Container'
import {
  STYLE_MARGIN_CONTAINER,
  STYLE_MARGIN_CONTAINER_BOTTOM,
} from '@/shared/constants/style/margin'
import { Button } from '@/shared/components/ui/Button'
import { TourCard } from '@/features/tours/components/ui/TourCard'
import { TourHighlight } from '@/features/tours/components/TourHighlight'

/* ======================================================
   PAGE — Tours Page
====================================================== */

export default function page() {
  const text = id.landing
  return (
    <div>
      {/* ======================================================
         SECTION HERO 
      ====================================================== */}
      <HeroSection />

      {/* ======================================================
         SECTION ALL TOURS 
      ====================================================== */}
      <AllToursSection />

      {/* ======================================================
         SECTION CTA 
      ====================================================== */}
      {/* <CTASection
        item={{
          quote: text.cta.quote,
          button1: text.cta.button1,
          button2: text.cta.button2,
        }}
      /> */}
    </div>
  )

  /* =========================
     UI
  ========================= */
  /* ======================================================
   SECTION HERO
  ====================================================== */
  function HeroSection() {
    return (
      <section className={STYLE_MARGIN_CONTAINER}>
        <Container>
          <div className="md:max-w-3xl max-w-2xl mx-auto text-center flex flex-col gap-8 items-center">
            <span>Paket Perjalanan</span>
            <TypographyH1>Temukan Perjalanan yang Tepat untuk Anda</TypographyH1>

            {/* button  */}
            <div className="flex gap-4 mt-6">
              <Button>Lihat Semua Tour</Button>
              <Button variant="monocrome_black">Hubungi Kami</Button>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
   SECTION ALL TOURS
  ====================================================== */
  function AllToursSection() {
    return (
      <section className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        <h2 className="sr-only">All Tours</h2>
        <Container className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {Array.from({ length: 10 }).map((item, index) => (
            <TourCard key={'tour:' + index} />
          ))}
        </Container>
      </section>
    )
  }
}
