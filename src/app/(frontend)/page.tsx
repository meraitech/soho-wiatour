'use client'

import React, { useLayoutEffect, useRef } from 'react'

import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { Container } from '@/shared/components/provider/Container'
import { Button } from '@/shared/components/ui/Button'
import { STYLE_MARGIN_CONTAINER, STYLE_MARGIN_CONTAINER_TOP } from '@/shared/constants/style/margin'

import { faComputerMouse } from '@fortawesome/free-solid-svg-icons'

import { HeaderSection } from '@/shared/components/HeaderSection'
import { TourHighlight } from '@/features/tours/components/TourHighlight'

import id from '@/shared/assets/jsons/id.json'
import { useBentoFlipScroll } from '@/features/company/hooks/useBentoFlipScroll'
import { VelocityScroller } from '@/shared/components/ScrollVelocity'
import { TestimonialCard } from '@/features/company/components/TestimonialCard'
import { gsap } from '@/shared/lib/gsap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { OurServiceSection } from '@/features/company/components/OurServiceSection'

/* ======================================================
   PAGE — Landing Page (Main Page)
====================================================== */

export default function page() {
  const text = id.landing
  return (
    <div className="overflow-x-hidden">
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
      <TourHighlight currentTourId="" />

      {/* ======================================================
         SECTION TESTIMONIALS 
      ====================================================== */}
      <TestimonialSection />
    </div>
  )

  /* =========================
     UI
  ========================= */
  /* ======================================================
   SECTION HERO
  ====================================================== */
  function HeroSection() {
    const heroWrapRef = useRef<HTMLDivElement | null>(null)
    const heroGalleryRef = useRef<HTMLDivElement | null>(null)

    /* ======================================================
     GSAP SCROLL LOGIC
  ====================================================== */
    useLayoutEffect(() => {
      if (!heroWrapRef.current) return

      const ctx = gsap.context(() => {
        const heroTitle = gsap.utils.toArray<HTMLDivElement>('.hero-title')

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroWrapRef.current,
            start: 'top top+=1',
            end: 'center top',
            scrub: true,

            // 🔑 TOGGLE CLASS DI HERO WRAPPER
            toggleClass: {
              targets: heroWrapRef.current,
              className: 'bg-foreground',
            },
          },
        })

        // Fade title out
        tl.to(heroTitle, {
          autoAlpha: 0,
          ease: 'none',
        })

        // Gallery subtle fade
        tl.from(
          heroGalleryRef.current,
          {
            opacity: 0.7,
            ease: 'none',
          },
          '<',
        )
      }, heroWrapRef)

      return () => ctx.revert()
    }, [])

    /* ======================================================
     OPTIONAL EXTRA SCROLL EFFECT
  ====================================================== */
    useBentoFlipScroll({ heroWrapRef, heroGalleryRef })

    /* ======================================================
     STATIC DATA
  ====================================================== */
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
      'https://images.unsplash.com/photo-1718876688960-4ae86c2f33d1?q=80&w=2670',
      'https://images.unsplash.com/photo-1500981458086-b8a11cd163af?q=80&w=2340',
      'https://images.unsplash.com/photo-1626603503426-deaafeccedc9?q=80&w=1925',
      'https://images.unsplash.com/photo-1595628218785-bf323bcc3ecc?q=80&w=1364',
      'https://images.unsplash.com/photo-1741320159899-df923b71de08?q=80&w=1287',
      'https://images.unsplash.com/photo-1712141481069-793132cc5769?q=80&w=1336',
      'https://images.unsplash.com/photo-1566908463863-abb4672c53a2?q=80&w=1364',
      'https://images.unsplash.com/photo-1694860843772-9fd8747f189f?q=80&w=1287',
    ]

    /* ======================================================
     RENDER
  ====================================================== */
    return (
      <section
        ref={heroWrapRef}
        className="
        relative w-full h-screen
        bg-foreground
        flex items-center justify-center
        overflow-hidden
      "
      >
        {/* GALLERY */}
        <div
          ref={heroGalleryRef}
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
              className={`
              gallery-item
              relative overflow-hidden rounded-2xl
              ${gridAreas[i]}
            `}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        {/* HERO CONTENT */}
        <div
          className="
        hero-title
        z-5 text-background
        flex flex-col items-center
        absolute inset-0
        justify-between py-10
      "
        >
          <div />

          <div
            className="
          flex flex-col items-center
          lg:gap-12 md:gap-8 gap-6
          xl:max-w-5xl lg:max-w-4xl
          md:max-w-3xl sm:max-w-2xl
        "
          >
            <TypographyH1 className="text-center">{text.hero.title}</TypographyH1>

            <div className="flex md:gap-6 gap-4">
              <Button size="lg">{text.hero.ctaPrimary}</Button>
              <Button variant="monocrome_white" size="lg">
                {text.hero.ctaSecondary}
              </Button>
            </div>
          </div>

          <div
            className="
          flex items-center gap-2
          border py-2 px-4 rounded-full
          text-background/30 text-sm
          animate-bounce backdrop-blur-sm
        "
          >
            <span>Scroll Down</span>
            <FontAwesomeIcon icon={faComputerMouse} />
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
        <div className={STYLE_MARGIN_CONTAINER_TOP}></div>
        <Container className={'grid md:grid-cols-2 gap-8'}>
          {/* left  */}
          <div className="flex flex-col justify-center items-start gap-14 md:max-w-100">
            <div className="flex flex-col gap-6 items-start">
              {/* <TitleSmallWithIcon text={text.about.titleSmall} icon={faBuilding} /> */}
              <span>{text.about.titleSmall}</span>
              <TypographyH2 className="mt-2">{text.about.title}</TypographyH2>
              <TypographyP>{text.about.description}</TypographyP>
            </div>
            <Button variant="monocrome_black"> {text.about.cta}</Button>
          </div>

          {/* right  */}
          <div className="bg-muted rounded-2xl overflow-hidden">
            <img
              src="https://plus.unsplash.com/premium_photo-1718146017949-c54d1fd3854d?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="object-cover md:aspect-6/7 aspect-4/3 duration-300"
            />
          </div>
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
        <Container className="flex flex-col items-center relative overflow-hidden ">
          <HeaderSection
            titleSmall={testimonial.header.titleSmall}
            title={testimonial.header.title}
          />
          <div className={STYLE_MARGIN_CONTAINER_TOP} />

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
