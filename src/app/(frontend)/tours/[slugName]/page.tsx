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
import id from '@/shared/assets/jsons/id.json'
import { TourService } from '@/features/tours/services'
import ItinerarySection from '@/features/tours/components/ItinerarySection'
import { notFound } from 'next/navigation'
import FootageSection from '@/shared/components/FootageSection'
import { Metadata } from 'next'
import { createTourMetadata } from '@/features/seo/tour.metadata'
import Image from 'next/image'
import clsx from 'clsx'
import { RichText } from '@payloadcms/richtext-lexical/react'

/* ======================================================
   METADATA
====================================================== */
export async function generateMetadata({
  params,
}: {
  params: { slugName: string }
}): Promise<Metadata> {
  const tour = await TourService.getBySlug(params.slugName)
  return createTourMetadata(tour!)
}

/* ======================================================
   PAGE — Tour Detail
====================================================== */
type PageProps = {
  params: Promise<{
    slugName: string
  }>
}

export default async function page({ params }: PageProps) {
  const text = id.landing
  const { slugName } = await params
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
            <Image
              src={tour?.heroImage.url || ''}
              alt={tour?.heroImage.alt || ''}
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
                <img
                  src={item.image.url!}
                  alt={item.image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </Container>
      </section>
    )
  }
}
