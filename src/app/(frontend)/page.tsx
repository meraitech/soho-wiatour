'use client'

import React, { useLayoutEffect, useRef } from 'react'

import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { Container } from '@/shared/components/provider/Container'
import { Button } from '@/shared/components/ui/Button'
import {
  STYLE_MARGIN_CONTAINER,
  STYLE_MARGIN_CONTAINER_BOTTOM,
} from '@/shared/constants/style/margin'

import { faBuilding } from '@fortawesome/free-solid-svg-icons'

import { HeaderSection } from '@/shared/components/HeaderSection'
import { TourHighlight } from '@/features/tours/components/TourHighlight'
import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { ServiceComponent } from '@/features/company/components/ServiceComponent'

import id from '@/shared/assets/jsons/id.json'
import { useBentoFlipScroll } from '@/features/company/hooks/useBentoFlipScroll'
import { VelocityScroller } from '@/shared/components/ScrollVelocity'
import { TestimonialCard } from '@/features/company/components/TestimonialCard'
import CTASection from '@/shared/components/CTASection'
import { gsap } from '@/shared/lib/gsap'

/* ======================================================
   PAGE — Landing Page (Main Page)
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
         SECTION TESTIMONIALS 
      ====================================================== */}
      <TestimonialSection />

      {/* ======================================================
         SECTION CTA 
      ====================================================== */}
      <CTASection
        item={{
          quote: text.cta.quote,
          button1: text.cta.button1,
          button2: text.cta.button2,
        }}
      />
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

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        const heroTitle = gsap.utils.toArray<HTMLDivElement>('.hero-title')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapRef.current,
            start: 'top top',
            end: 'center top',
            markers: true,
            scrub: true,
          },
        })

        tl.to(heroTitle, {
          autoAlpha: 0,
          ease: 'none',
        })

        tl.from(
          galleryRef.current,
          {
            opacity: 0.15,
            ease: 'none',
          },
          '<',
        )
      }, wrapRef)

      return () => ctx.revert()
    }, [])

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
      'https://images.unsplash.com/photo-1718876688960-4ae86c2f33d1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1578167635658-84df281b1b27?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1616895727759-dd84a2690433?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1595628218785-bf323bcc3ecc?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1741320159899-df923b71de08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1712141481069-793132cc5769?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1566908463863-abb4672c53a2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1694860843772-9fd8747f189f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ]
    return (
      <section
        ref={wrapRef}
        className="relative w-full bg-foreground h-screen flex items-center justify-center overflow-hidden"
      >
        <div
          ref={galleryRef}
          className="
          grid gap-[1.5vh]
          grid-cols-[repeat(3,32.5vw)]
          grid-rows-[repeat(4,23vh)]
          justify-center content-center
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

        <div className="hero-title z-5 text-background flex flex-col items-center lg:gap-12 md:gap-8 gap-6 xl:max-w-5xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl max-xl duration-300 absolute">
          <TypographyH1 className="text-center">{text.hero.title}</TypographyH1>
          <div className="flex md:gap-6 gap-4">
            <Button size="lg">{text.hero.ctaPrimary}</Button>
            <Button variant="monocrome_white" size="lg">
              {text.hero.ctaSecondary}
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
              <TitleSmallWithIcon text={text.about.titleSmall} icon={faBuilding} />
              <TypographyH2 className="mt-2">{text.about.title}</TypographyH2>
              <TypographyP>{text.about.description}</TypographyP>
            </div>
            <Button variant="monocrome_black"> {text.about.cta}</Button>
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
    const ourServices = text.services.items

    return (
      <section className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        <Container className="flex flex-col items-center gap-12">
          <HeaderSection
            titleSmall={text.services.header.titleSmall}
            title={text.services.header.title}
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
    const testimonial = text.testimonial

    return (
      <section className={STYLE_MARGIN_CONTAINER}>
        <Container className="flex flex-col items-center gap-12 relative overflow-hidden ">
          <HeaderSection
            titleSmall={testimonial.header.titleSmall}
            title={testimonial.header.title}
          />

          <div className="flex flex-col gap-6 relative w-full">
            <div className="bg-linear-to-r from-background w-30 h-full absolute left-0 top-0 z-5" />
            {/* ROW 1 */}
            <VelocityScroller baseVelocity={80} numCopies={3} trackClassName="gap-6">
              <div className="flex gap-6">
                {testimonial.items.map((item, index) => (
                  <TestimonialCard key={`row1-${index}`} item={item} />
                ))}
              </div>
            </VelocityScroller>

            {/* ROW 2 */}
            <VelocityScroller baseVelocity={-80} numCopies={3} trackClassName="gap-6">
              <div className="flex gap-6">
                {testimonial.items.map((item, index) => (
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
