import React from 'react'

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
import BentoGallery from '@/shared/components/BentoGallery'

/* ======================================================
   PAGE — Landing Page (Main Page)
====================================================== */

export default function page() {
  return (
    <div>
      {/* ======================================================
         SECTION HERO
      ====================================================== */}
      {/* <HeroSection /> */}
      <BentoGallery />

      {/* ======================================================
         SECTION ABOUT
      ====================================================== */}
      <AboutSection />

      {/* ======================================================
         SECTION SERVICES
      ====================================================== */}
      <OurServiceSection />

      {/* ======================================================
         SECTION TOUR HIGHLIGHT ❌
      ====================================================== */}
      <TourHighlight />

      {/* ======================================================
         SECTION TESTIMONIALS ❌
      ====================================================== */}

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
    return (
      <section className="w-full h-screen relative flex items-center justify-center">
        <div className="z-5 text-background flex flex-col items-center gap-12 max-w-4xl">
          <TypographyH1 className="text-center">{id.hero.title}</TypographyH1>
          <div className="flex gap-6">
            <Button size="lg">{id.hero.ctaPrimary}</Button>
            <Button variant="monocrome_white" size="lg">
              {id.hero.ctaSecondary}
            </Button>
          </div>
        </div>

        {/* background  */}
        <div className="bg-foreground w-full h-full absolute top-0 left-0" />
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
}
