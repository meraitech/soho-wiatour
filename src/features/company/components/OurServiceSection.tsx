'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap'
import { Container } from '@/shared/components/provider/Container'
import { HeaderSection } from '@/shared/components/HeaderSection'

import { STYLE_MARGIN_CONTAINER, STYLE_MARGIN_CONTAINER_TOP } from '@/shared/constants/style/margin'
import id from '@/shared/assets/jsons/id.json'
import { ServiceCard } from './ServiceCard'

export function OurServiceSection() {
  const text = id.landing
  const ourServices = text.services.items

  const serviceWrapRef = useRef<HTMLDivElement | null>(null)
  const serviceLeftRef = useRef<HTMLDivElement | null>(null)
  const serviceImageRef = useRef<HTMLImageElement | null>(null)

  const activeIndexRef = useRef(0)
  const serviceTriggersRef = useRef<ScrollTrigger[]>([])

  /* =========================
     UTILS
  ========================= */

  function killTriggers() {
    serviceTriggersRef.current.forEach((st) => st.kill())
    serviceTriggersRef.current = []
  }

  function waitForImage(img: HTMLImageElement, cb: () => void) {
    if (img.complete) cb()
    else img.addEventListener('load', cb, { once: true })
  }

  function swapImage(index: number) {
    if (activeIndexRef.current === index) return
    activeIndexRef.current = index

    const img = serviceImageRef.current
    if (!img) return

    gsap.to(img, {
      autoAlpha: 0,
      duration: 0.25,
      onComplete: () => {
        img.src = ourServices[index].imgUrl
        gsap.to(img, { autoAlpha: 1, duration: 0.25 })
      },
    })
  }

  function initScroll() {
    killTriggers()

    const steps = gsap.utils.toArray<HTMLElement>('.service-step')
    if (!steps.length || !serviceLeftRef.current) return

    const first = steps[0]
    const last = steps[steps.length - 1]

    // PIN IMAGE (LEFT)
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

    // IMAGE SWAP PER STEP
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
  }

  /* =========================
     EFFECT
  ========================= */

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (!serviceImageRef.current) return

      waitForImage(serviceImageRef.current, () => {
        initScroll()
      })
    }, serviceWrapRef)

    const onResize = () => {
      killTriggers()

      requestAnimationFrame(() => {
        initScroll()
      })
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      killTriggers()
      ctx.revert()
    }
  }, [])

  /* =========================
     RENDER
  ========================= */

  return (
    <section id="service" className={STYLE_MARGIN_CONTAINER}>
      <Container className="flex flex-col items-center">
        <HeaderSection
          titleSmall={text.services.header.titleSmall}
          title={text.services.header.title}
        />

        <div className={STYLE_MARGIN_CONTAINER_TOP} />

        <div ref={serviceWrapRef} className="w-full grid md:grid-cols-2 gap-8">
          {/* LEFT — IMAGE */}
          <div
            ref={serviceLeftRef}
            className="w-full max-md:hidden bg-muted md:aspect-square aspect-4/3 rounded-2xl overflow-hidden max-md:order-2"
          >
            <img
              ref={serviceImageRef}
              src={ourServices[0].imgUrl}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT — STEPS */}
          <section className="flex flex-col items-center gap-12">
            {ourServices.map((item, i) => (
              <ServiceCard
                key={i}
                title_small={item.titleSmall}
                title={item.title}
                paragraph={item.paragraph}
                image={item.imgUrl} // ⬅️ PENTING
                isLast={ourServices.length === i + 1}
              />
            ))}
          </section>
        </div>
      </Container>
    </section>
  )
}
