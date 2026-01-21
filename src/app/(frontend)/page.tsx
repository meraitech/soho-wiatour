'use client'

import React, { useRef } from 'react'

import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { Container } from '@/shared/components/ui/Container'
import { Button } from '@/shared/components/ui/Button'
import { STYLE_MARGIN_CONTAINER } from '@/shared/constants/style/margin'

import { faBuilding } from '@fortawesome/free-solid-svg-icons'

import { HeaderSection } from '@/shared/components/HeaderSection'
import { TourHighlight } from '@/features/tours/components/TourHighlight'
import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { ServiceComponent } from '@/features/company/components/ServiceComponent'

import id from '@/shared/assets/jsons/id.json'
import { useBentoFlipScroll } from '@/features/company/hooks/useBentoFlipScroll'
import { VelocityScroller } from '@/shared/components/ScrollVelocity'
import { TestimonialCard } from '@/features/company/components/TestimonialCard'

/* ======================================================
   PAGE — Landing Page (Main Page)
====================================================== */

export default function page() {
  return (
    <div>
      {/* ======================================================
         SECTION HERO
      ====================================================== */}
      <HeroSection />

      {/* ======================================================
         SECTION ABOUT
      ====================================================== */}
      <AboutSection />

      {/* ======================================================
         SECTION SERVICES
      ====================================================== */}
      <OurServiceSection />

      {/* ======================================================
         SECTION TOUR HIGHLIGHT
      ====================================================== */}
      <TourHighlight />

      {/* ======================================================
         SECTION TESTIMONIALS ❌
      ====================================================== */}
      <TestimonialSection />

      {/* ======================================================
         SECTION CTA ❌
      ====================================================== */}

      <div className="mb-100"></div>
    </div>
  )

  /* =========================
     UI
  ========================= */
  /* ======================================================
   SECTION HERO
  ====================================================== */
  function HeroSection() {
    const wrapRef = useRef<HTMLDivElement | null>(null)
    const galleryRef = useRef<HTMLDivElement | null>(null)

    useBentoFlipScroll({ wrapRef, galleryRef })

    const gridAreas = [
      '[grid-area:1/1/3/2]',
      '[grid-area:1/2/2/3]',
      '[grid-area:2/2/4/3]',
      '[grid-area:1/3/3/4]',
      '[grid-area:3/1/4/2]',
      '[grid-area:3/3/5/4]',
      '[grid-area:4/1/5/2]',
      '[grid-area:4/2/5/3]',
    ]

    const images = [
      'https://assets.codepen.io/16327/portrait-pattern-1.jpg',
      'https://assets.codepen.io/16327/portrait-image-12.jpg',
      'https://assets.codepen.io/16327/portrait-image-8.jpg',
      'https://assets.codepen.io/16327/portrait-pattern-2.jpg',
      'https://assets.codepen.io/16327/portrait-image-4.jpg',
      'https://assets.codepen.io/16327/portrait-image-3.jpg',
      'https://assets.codepen.io/16327/portrait-pattern-3.jpg',
      'https://assets.codepen.io/16327/portrait-image-1.jpg',
    ]
    return (
      <section
        ref={wrapRef}
        className="relative w-full h-screen bg-foreground flex items-center justify-center overflow-hidden"
      >
        <div
          ref={galleryRef}
          className="
          grid gap-[1vh]
          grid-cols-[repeat(3,32.5vw)]
          grid-rows-[repeat(4,23vh)]
          justify-center content-center
          opacity-40
        "
        >
          {images.map((src, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-2xl ${gridAreas[i]}`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="z-5 text-background flex flex-col items-center gap-12 max-w-4xl absolute">
          <TypographyH1 className="text-center">{id.hero.title}</TypographyH1>
          <div className="flex gap-6">
            <Button size="lg">{id.hero.ctaPrimary}</Button>
            <Button variant="monocrome_white" size="lg">
              {id.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </section>
    )
  }

  /* ======================================================
   SECTION ABOUT
  ====================================================== */
  function AboutSection() {
    return (
      <section className={STYLE_MARGIN_CONTAINER}>
        <Container className="grid md:grid-cols-2 gap-8">
          {/* left  */}
          <div className="flex flex-col justify-between items-start gap-10 md:max-w-100">
            <div className="flex flex-col gap-6 items-start">
              <TitleSmallWithIcon text={id.about.titleSmall} icon={faBuilding} />
              <TypographyH2 className="mt-2">{id.about.title}</TypographyH2>
              <TypographyP>{id.about.description}</TypographyP>
            </div>
            <Button variant="monocrome_black"> {id.about.cta}</Button>
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

  /* ======================================================
   SECTION SERVICES
  ====================================================== */
  function OurServiceSection() {
    const ourServices = id.services.items

    return (
      <section className={STYLE_MARGIN_CONTAINER}>
        <Container className="flex flex-col items-center gap-12">
          <HeaderSection
            titleSmall={id.services.header.titleSmall}
            title={id.services.header.title}
          />
          {ourServices.map((item, index) => (
            <ServiceComponent
              key={index}
              title_small={item.titleSmall}
              title={item.title}
              paragraph={item.paragraph}
            />
          ))}
        </Container>
      </section>
    )
  }

  /* ======================================================
   SECTION TESTIMONIAL
  ====================================================== */
  function TestimonialSection() {
    const items = id.testimonial.items

    return (
      <section className={STYLE_MARGIN_CONTAINER}>
        <Container className="flex flex-col items-center gap-12 relative overflow-hidden ">
          <HeaderSection
            titleSmall={id.testimonial.header.titleSmall}
            title={id.testimonial.header.title}
          />

          <div className="flex flex-col gap-6 relative w-full">
            <div className="bg-linear-to-r from-background w-30 h-full absolute left-0 top-0 z-5" />
            {/* ROW 1 */}
            <VelocityScroller baseVelocity={80} numCopies={3} trackClassName="gap-6">
              <div className="flex gap-6">
                {items.map((item, index) => (
                  <TestimonialCard key={`row1-${index}`} item={item} />
                ))}
              </div>
            </VelocityScroller>

            {/* ROW 2 */}
            <VelocityScroller baseVelocity={-80} numCopies={3} trackClassName="gap-6">
              <div className="flex gap-6">
                {items.map((item, index) => (
                  <TestimonialCard key={`row2-${index}`} item={item} />
                ))}
              </div>
            </VelocityScroller>
            <div className="bg-linear-to-l from-background w-30 h-full absolute right-0 top-0 z-5" />
          </div>
        </Container>
      </section>
    )
  }
}
