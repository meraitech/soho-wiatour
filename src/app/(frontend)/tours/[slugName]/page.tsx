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
<<<<<<< Updated upstream
import { TypographyP } from '@/shared/components/ui/TypographyP'
import id from '@/shared/assets/jsons/id.json'
import { InfiniteMovingCards } from '@/shared/components/ui/InfiniteMovingCard'
=======
>>>>>>> Stashed changes
import { TourService } from '@/features/tours/services'
import ItinerarySection from '@/features/tours/components/ItinerarySection'
import { notFound } from 'next/navigation'
import FootageSection from '@/shared/components/FootageSection'
import { Metadata } from 'next'
import { createTourMetadata } from '@/features/seo/tour.metadata'
import Image from 'next/image'
<<<<<<< Updated upstream
=======
import clsx from 'clsx'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { TourHighlight } from '@/features/tours/components/TourHighlight'
>>>>>>> Stashed changes

/* ======================================================
   METADATA
====================================================== */
export async function generateMetadata({
  params,
}: {
  params: { slugName: string }
}): Promise<Metadata> {
  const tour = await TourService.getBySlug(params.slugName)
  if (!tour) return {}
  return createTourMetadata(tour)
}

/* ======================================================
   PAGE — Tour Detail
====================================================== */
<<<<<<< Updated upstream
type PageProps = {
  params: {
    slugName: string
  }
}

export default async function page({ params }: PageProps) {
  const text = id.landing
=======

export default async function Page({ params }: { params: { slugName: string } }) {
>>>>>>> Stashed changes
  const { slugName } = params
  const tour = await TourService.getBySlug(slugName)

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
      {tour.itineraries && <ItinerarySection itineraries={tour.itineraries} />}

      {/* ======================================================
         SECTION IMAGE TRAIL
      ====================================================== */}
      {tour.gallery && <FootageSection gallery={tour.gallery} />}

      {/* ======================================================
          SECTION TOUR HIGHLIGHT
      ====================================================== */}
      <div className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        {tour?.id && <TourHighlight currentTourId={tour.id} />}
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
            <Image
              src={tour?.heroImage.url!}
              alt={tour?.heroImage.alt!}
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              priority
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
<<<<<<< Updated upstream
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4 justify-center">
              <TypographyH2 className="mb-4">Detail Perjalanan</TypographyH2>
              <TypographyP>{tour?.description}</TypographyP>
=======
          {tour?.travelDetails?.map((item, index) => (
            <div key={index} className={clsx('grid md:grid-cols-2 gap-12')}>
              <div
                className={clsx(
                  'flex flex-col gap-4 justify-center',
                  index % 2 === 1 && 'md:order-2',
                )}
              >
                {index === 0 && <TypographyH2 className="mb-4">Detail Perjalanan</TypographyH2>}
                <RichText data={item.description} />
              </div>
              <div
                className={clsx(
                  'bg-muted w-full md:max-w-120 max-md:aspect-5/3 aspect-square rounded-3xl overflow-hidden',
                  index % 2 === 1 ? 'mr-auto' : 'ml-auto',
                )}
              >
                <Image
                  src={item.image.url!}
                  alt={item.image.alt}
                  width={1280}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
>>>>>>> Stashed changes
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
}
