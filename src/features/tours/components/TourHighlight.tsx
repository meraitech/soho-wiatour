'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

import { TourCard } from './ui/TourCard'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { Button } from '@/shared/components/ui/Button'
import { Container } from '@/shared/components/provider/Container'
import { PreventClickOnDrag } from '@/shared/components/provider/PreventClickOnDrag'
import { STYLE_MARGIN_CONTAINER } from '@/shared/constants/style/margin'
import { TourSummary } from '../types'

type RelatedToursResponse = { tours: TourSummary[] }

export const TourHighlight = ({ currentTourId }: { currentTourId: string }) => {
  const router = useRouter()
  const redRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const [tours, setTours] = useState<TourSummary[]>([])

  // 🔑 satu-satunya state kebenaran
  const startScrollLeftRef = useRef(0)
  const isMouseDownRef = useRef(false)

  const [breakoutWidth, setBreakoutWidth] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    let isMounted = true

    const loadTours = async () => {
      const params = new URLSearchParams()
      if (currentTourId) params.set('currentTourId', currentTourId)
      params.set('limit', '6')

      const response = await fetch(`/api/tours/related?${params.toString()}`, {
        signal: controller.signal,
      })

      if (!response.ok) return

      const data = (await response.json()) as RelatedToursResponse
      if (isMounted) setTours(data.tours ?? [])
    }

    loadTours().catch(() => {})

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [currentTourId])

  /* =========================
     BREAKOUT WIDTH
  ========================= */
  useLayoutEffect(() => {
    if (!redRef.current) return

    const el = redRef.current

    const calc = () => {
      const rect = el.getBoundingClientRect()
      setBreakoutWidth(window.innerWidth - rect.left)
    }

    calc()
    const ro = new ResizeObserver(calc)
    ro.observe(el)
    window.addEventListener('resize', calc)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', calc)
    }
  }, [])

  /* =========================
     MOUSE DRAG (MINIMAL & STABLE)
  ========================= */
  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onMouseDown = (e: MouseEvent) => {
      isMouseDownRef.current = true
      startScrollLeftRef.current = el.scrollLeft
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isMouseDownRef.current) return
      el.scrollLeft -= e.movementX
    }

    const onMouseUp = () => {
      isMouseDownRef.current = false
    }

    el.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      el.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <section className={'overflow-hidden' + STYLE_MARGIN_CONTAINER}>
      <Container className="flex max-md:flex-col items-center gap-12">
        {/* LEFT */}
        <div className="flex flex-col w-full md:max-w-70 shrink-0 gap-8 items-start">
          <div className="flex flex-col gap-4">
            <span>Tour Pilihan</span>
            <TypographyH2>Destinasi yang Paling Diminati</TypographyH2>
          </div>
          <Button onClick={() => router.push('/tours')} variant="monocrome_black">
            Semua Tour
          </Button>
        </div>

        {/* RIGHT */}
        <div ref={redRef} className="relative w-full h-110">
          <div className="bg-linear-to-r from-background h-full w-8 absolute left-0 top-0 z-2" />
          <div
            ref={scrollRef}
            className="
            absolute top-0 left-0 h-full
            overflow-x-auto overflow-y-hidden
            pr-10 pl-8 cursor-grab
            select-none no-scrollbar
            "
            style={{ width: breakoutWidth ?? 'auto' }}
          >
            <div className="flex w-max gap-4">
              {tours.map((item, i) => (
                <PreventClickOnDrag
                  key={i}
                  scrollRef={scrollRef}
                  startScrollLeftRef={startScrollLeftRef}
                >
                  <TourCard
                    width="md:w-[330px] w-[270px]"
                    slug={item.slug}
                    imgUrl={item.thumbnail.url!}
                    title={item.title}
                    imgAlt={item.thumbnail.alt}
                  />
                </PreventClickOnDrag>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
