'use client'

import { useLayoutEffect, useRef, useState } from 'react'

import { TourCard } from './ui/TourCard'
import { Button } from '@/shared/components/ui/Button'
import { Container } from '@/shared/components/provider/Container'
import { PreventClickOnDrag } from '@/shared/components/provider/PreventClickOnDrag'
import { STYLE_MARGIN_CONTAINER } from '@/shared/constants/style/margin'

export type TourHighlightItem = {
  id: string
  title: string
  slug: string
  thumbnail: {
    url?: string | null
    alt?: string | null
  }
}

export const TourHighlightClient = ({ tours }: { tours: TourHighlightItem[] }) => {
  const redRef = useRef<HTMLDivElement | null>(null)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const startScrollLeftRef = useRef(0)
  const isMouseDownRef = useRef(false)
  const [breakoutWidth, setBreakoutWidth] = useState<number | null>(null)

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

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const onMouseDown = () => {
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
    <section id="tour-highlight" className={`overflow-hidden ${STYLE_MARGIN_CONTAINER}`}>
      <Container className="flex max-lg:flex-col items-center gap-12">
        <div className="flex flex-col w-full lg:max-w-80 shrink-0 gap-8 items-start">
          <div className="flex flex-col gap-4">
            <span>Tour Pilihan</span>
            <h2 className={'lg:text-5xl md:text-4xl text-3xl font-medium '}>
              Destinasi yang Paling Diminati
            </h2>
          </div>
          <Button href="/tours" variant="monocrome_black">
            Semua Tour
          </Button>
        </div>

        <div ref={redRef} className="relative w-full h-110">
          <div className="bg-linear-to-r from-background h-full w-8 absolute left-0 top-0 z-2" />

          {tours.length > 0 ? (
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
                {tours.map((item) => (
                  <PreventClickOnDrag
                    key={item.id}
                    scrollRef={scrollRef}
                    startScrollLeftRef={startScrollLeftRef}
                  >
                    <TourCard
                      width="lg:w-[330px] md:w-[270px] w-[200px]"
                      slug={item.slug}
                      imgUrl={item.thumbnail.url || ''}
                      title={item.title}
                      imgAlt={item.thumbnail.alt || item.title}
                    />
                  </PreventClickOnDrag>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center px-8 text-paragraph">
              Tour akan segera tersedia.
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
