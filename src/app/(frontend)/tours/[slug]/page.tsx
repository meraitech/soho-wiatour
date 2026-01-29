import React from 'react'

import { Container } from '@/shared/components/provider/Container'
import { Button } from '@/shared/components/ui/Button'
import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import {
  STYLE_MARGIN_CONTAINER,
  STYLE_MARGIN_CONTAINER_BOTTOM,
} from '@/shared/constants/style/margin'
import { STYLE_ROUNDED_CONTAINER } from '@/shared/constants/style/rounded'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import id from '@/shared/assets/jsons/id.json'
import { InfiniteMovingCards } from '@/shared/components/ui/InfiniteMovingCard'
import { TourService } from '@/features/tours/services'
import ItinerarySection from '@/features/tours/components/ItinerarySection'
import { notFound } from 'next/navigation'

/* ======================================================
   PAGE — Tour Detail
====================================================== */
type PageProps = {
  params: {
    slug: string
  }
}

export default async function page({ params }: PageProps) {
  const text = id.landing
  const { slug } = params
  const tour = await TourService.getBySlug(slug)

  if (!tour) notFound()

  return (
    <div>
      {/* ======================================================
         SECTION HERO 
      ====================================================== */}
      <HeroSection />

      {/* ======================================================
         SECTION DETAIL TOUR
      ====================================================== */}
      <DetailSection />

      {/* ======================================================
         SECTION ITINERARY
      ====================================================== */}
      {tour?.itenararies && <ItinerarySection itenararies={tour?.itenararies} />}

      {/* ======================================================
         SECTION IMAGE TRAIL
      ====================================================== */}
      {/* <FootageSection /> */}

      {/* ======================================================
          SECTION TOUR HIGHLIGHT
      ====================================================== */}
      <div className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        {/* {tour?.id && <TourHighlight currentTourId={tour.id} />} */}
      </div>
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
        <Container className="flex flex-col gap-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-8 items-center">
            <span>Paket Wisata Internasional</span>
            <TypographyH1>{tour?.title}</TypographyH1>
            <Button className="mt-4">Pesan Sekarang</Button>
          </div>

          {/* img  */}
          <div className={'w-full aspect-video overflow-hidden relative' + STYLE_ROUNDED_CONTAINER}>
            <img
              src={tour?.heroImage.url!}
              alt={tour?.heroImage.alt}
              className="w-full h-full object-cover"
            />
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
     SECTION DETAIL
    ====================================================== */
  function DetailSection() {
    return (
      <section className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        <Container className="flex flex-col gap-14">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4 justify-center">
              <TypographyH2 className="mb-4">Detail Perjalanan</TypographyH2>
              <TypographyP>{tour?.description}</TypographyP>
            </div>
            <div className="ml-auto bg-accent w-full md:max-w-120 max-md:aspect-5/3 aspect-square"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4 justify-center md:order-2">
              <TypographyP>
                Selain destinasi unggulan, perjalanan ini juga memberikan waktu yang cukup untuk
                beristirahat dan menikmati suasana kota. Itinerary disusun agar tidak terlalu padat,
                sehingga Anda dapat menikmati setiap momen perjalanan dengan lebih santai.
              </TypographyP>
              <TypographyP>
                Dengan pendampingan tim berpengalaman, setiap proses perjalanan—mulai dari
                keberangkatan hingga kepulangan—berjalan dengan tertib dan aman.
              </TypographyP>
            </div>
            <div className="mr-auto bg-accent w-full md:max-w-120  max-md:aspect-5/3 aspect-square"></div>
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
     SECTION FOOTAGE
    ====================================================== */
  function FootageSection() {
    const footages = [
      {
        imgUrl:
          'https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Trans 7',
      },
      {
        imgUrl:
          'https://plus.unsplash.com/premium_photo-1663040271283-bd044a62da1a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Trans 7',
      },
      {
        imgUrl:
          'https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Trans 7',
      },
      {
        imgUrl:
          'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Trans 7',
      },
    ]

    return (
      <div
        className={
          'rounded-md flex flex-col gap-8 antialiased items-center justify-center relative overflow-hidden ' +
          STYLE_MARGIN_CONTAINER_BOTTOM
        }
      >
        <InfiniteMovingCards
          items={footages}
          speed="slow"
          renderItem={(item, index) => (
            <div key={index} className="rounded-xl overflow-hidden bg-muted">
              <img
                src={item.imgUrl}
                alt={`${item.title} Photo`}
                className="h-100 w-auto object-contain"
              />
            </div>
          )}
        />
        <InfiniteMovingCards
          items={footages}
          speed="slow"
          direction="right"
          renderItem={(item, index) => (
            <div key={index} className="rounded-xl overflow-hidden bg-muted">
              <img
                src={item.imgUrl}
                alt={`${item.title} Photo`}
                className="h-100 w-auto object-contain"
              />
            </div>
          )}
        />
      </div>
    )
  }
}
