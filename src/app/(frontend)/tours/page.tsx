import React from 'react'
import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { Container } from '@/shared/components/provider/Container'
import {
  STYLE_MARGIN_CONTAINER,
  STYLE_MARGIN_CONTAINER_BOTTOM,
} from '@/shared/constants/style/margin'
import { Button } from '@/shared/components/ui/Button'
import { TourCard } from '@/features/tours/components/ui/TourCard'
import { TourService } from '@/features/tours/services'
import { TourSummary } from '@/features/tours/types'

/* ======================================================
   PAGE — Tours Page
====================================================== */

export default async function Page() {
  const tours = await TourService.getAll()
  return (
    <div id="tour-highlight" className="overflow-hidden">
      {/* ======================================================
         SECTION HERO 
      ====================================================== */}
      <HeroSection />

      {/* ======================================================
         SECTION ALL TOURS 
      ====================================================== */}
      <AllToursSection tours={tours} />
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
  function AllToursSection({ tours }: { tours: TourSummary[] }) {
    return (
      <section className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        <h2 className="sr-only">All Tours</h2>
        <Container className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
          {tours.map((item, index) => (
            <TourCard
              key={'tour:' + index}
              slug={item.slug}
              imgUrl={item.thumbnail.url!}
              title={item.title}
              imgAlt={item.thumbnail.alt}
            />
          ))}
        </Container>
      </section>
    )
  }
}
