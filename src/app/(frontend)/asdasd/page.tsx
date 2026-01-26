'use client'

import React, { useLayoutEffect, useRef } from 'react'
import id from '@/shared/assets/jsons/id.json'
import { STYLE_MARGIN_CONTAINER, STYLE_MARGIN_CONTAINER_TOP } from '@/shared/constants/style/margin'
import { Container } from '@/shared/components/provider/Container'
import { HeaderSection } from '@/shared/components/HeaderSection'
import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap'
import { ServiceCard } from '@/features/company/components/ServiceComponent'

export default function page() {
  const text = id.landing
  return <OurServiceSection />

  /* ======================================================
     SECTION SERVICES
    ====================================================== */
  function OurServiceSection() {
    const ourServices = text.services.items
    const wrapRef = useRef<HTMLDivElement | null>(null)
    const leftRef = useRef<HTMLDivElement | null>(null)
    const imageRef = useRef<HTMLImageElement | null>(null)

    useLayoutEffect(() => {
      const ctx = gsap.context(() => {
        // 1. Pin LEFT saja
        ScrollTrigger.create({
          trigger: wrapRef.current,
          start: 'top 30%',
          end: 'bottom 30%',
          pin: leftRef.current,
          pinSpacing: false,
          markers: true,
        })

        // 2. Ambil semua step kanan
        const steps = gsap.utils.toArray<HTMLElement>('.service-step')

        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            markers: true,
            start: 'top 60%',
            end: 'bottom 60%',
            onEnter: () => swapImage(index),
            onEnterBack: () => swapImage(index),
          })
        })

        function swapImage(index: number) {
          const src = ourServices[index].imgUrl

          gsap.to(imageRef.current, {
            autoAlpha: 0,
            duration: 0.3,
            onComplete: () => {
              if (imageRef.current) {
                imageRef.current.src = src
              }
              gsap.to(imageRef.current, {
                autoAlpha: 1,
                duration: 0.3,
              })
            },
          })
        }
      })

      return () => ctx.revert()
    }, [])

    return (
      <section className={STYLE_MARGIN_CONTAINER}>
        <Container className="flex flex-col items-center">
          <HeaderSection
            titleSmall={text.services.header.titleSmall}
            title={text.services.header.title}
          />
          <div className={STYLE_MARGIN_CONTAINER_TOP} />

          <div ref={wrapRef} className="w-full grid md:grid-cols-2 gap-8">
            {/* left  */}
            <div
              ref={leftRef}
              className="w-full bg-muted md:aspect-square aspect-4/3 duration-300 max-md:order-2"
            >
              <img
                ref={imageRef}
                src="/brand/logo-mark.svg"
                alt=""
                className="object-cover w-full h-full"
              />
            </div>

            {/* right  */}
            <section className="flex flex-col items-center">
              {ourServices.map((item, index) => {
                return (
                  <ServiceCard
                    key={index}
                    title_small={item.titleSmall}
                    title={item.title}
                    paragraph={item.paragraph}
                    isLast={ourServices.length === index + 1}
                  />
                )
              })}
            </section>
          </div>
        </Container>
      </section>
    )
  }
}
