'use client'

import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap'
import { Container } from '@/shared/components/provider/Container'
import { HeaderSection } from '@/shared/components/HeaderSection'

import { STYLE_MARGIN_CONTAINER_TOP } from '@/shared/constants/style/margin'
import id from '@/shared/assets/jsons/id.json'
import { ServiceCard } from '../../testimonials/components/ServiceCard'
import { BaseImage } from '@/shared/components/ui/BaseImage'

export function OurServiceSection() {
  const text = id.landing
  const ourServices = text.services.items

  const serviceWrapRef = useRef<HTMLDivElement | null>(null)
  const serviceLeftRef = useRef<HTMLDivElement | null>(null)
  const serviceImageRef = useRef<HTMLImageElement | null>(null)

  const [activeImageSrc, setActiveImageSrc] = useState(ourServices[0]?.imgUrl ?? '')
  const activeIndexRef = useRef(0)
  const pendingIndexRef = useRef(-1)
  const serviceTriggersRef = useRef<ScrollTrigger[]>([])
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout>>()

  /* =========================
     UTILS
  ========================= */

  const killTriggers = useCallback(() => {
    serviceTriggersRef.current.forEach((st) => st.kill())
    serviceTriggersRef.current = []
  }, [])

  const swapImage = useCallback(
    (index: number) => {
      const nextImageSrc = ourServices[index]?.imgUrl
      if (!nextImageSrc) return
      if (activeIndexRef.current === index) return

      const img = serviceImageRef.current
      if (!img) {
        activeIndexRef.current = index
        setActiveImageSrc(nextImageSrc)
        return
      }

      activeIndexRef.current = index
      pendingIndexRef.current = index

      gsap.killTweensOf(img)
      gsap.to(img, {
        autoAlpha: 0,
        duration: 0.15,
        onComplete: () => {
          if (pendingIndexRef.current === index) {
            setActiveImageSrc(nextImageSrc)
          }
        },
      })
    },
    [ourServices],
  )

  const initScroll = useCallback(() => {
    if (!serviceWrapRef.current) return

    killTriggers()

    const steps = gsap.utils.toArray<HTMLElement>('.service-step', serviceWrapRef.current)
    if (!steps.length || !serviceLeftRef.current) return

    const first = steps[0]
    const last = steps[steps.length - 1]

    serviceTriggersRef.current.push(
      ScrollTrigger.create({
        trigger: first,
        start: 'top 30%',
        endTrigger: last,
        end: 'bottom center',
        pin: serviceLeftRef.current,
        pinSpacing: true,
        invalidateOnRefresh: true,
      }),
    )

    steps.forEach((step, i) => {
      serviceTriggersRef.current.push(
        ScrollTrigger.create({
          trigger: step,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => swapImage(i),
          onEnterBack: () => swapImage(i),
          invalidateOnRefresh: true,
        }),
      )
    })

    ScrollTrigger.refresh()
  }, [killTriggers, swapImage])

  /* =========================
     EFFECT
  ========================= */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      initScroll()
    }, serviceWrapRef)

    const onResize = () => {
      clearTimeout(resizeTimerRef.current)
      resizeTimerRef.current = setTimeout(initScroll, 200)
    }

    window.addEventListener('resize', onResize)

    return () => {
      clearTimeout(resizeTimerRef.current)
      window.removeEventListener('resize', onResize)
      killTriggers()
      ctx.revert()
    }
  }, [initScroll, killTriggers])

  /* =========================
     RENDER
  ========================= */

  return (
    <section id="services">
      <Container className="flex flex-col items-center">
        <HeaderSection
          titleSmall={text.services.header.titleSmall}
          title={text.services.header.title}
        />

        <div className={STYLE_MARGIN_CONTAINER_TOP} />

        <div ref={serviceWrapRef} className="w-full grid md:grid-cols-2 lg:gap-24 md:gap-16 gap-12">
          <div
            ref={serviceLeftRef}
            className="w-full max-md:hidden md:aspect-square aspect-4/3 rounded-2xl overflow-hidden max-md:order-2 relative"
          >
            <BaseImage
              ref={serviceImageRef}
              src={activeImageSrc}
              alt="Gambar Service"
              className="w-full h-full object-cover invisible"
              fill
              priority
              onLoadingComplete={(img) => {
                serviceImageRef.current = img
                gsap.killTweensOf(img)
                gsap.set(img, { autoAlpha: 1 })
              }}
            />
          </div>

          <section className="flex flex-col items-center gap-12">
            {ourServices.map((item, i) => (
              <ServiceCard
                key={i}
                title_small={item.titleSmall}
                title={item.title}
                paragraph={item.paragraph}
                image={item.imgUrl}
                isLast={ourServices.length === i + 1}
              />
            ))}
          </section>
        </div>
      </Container>
    </section>
  )
}
