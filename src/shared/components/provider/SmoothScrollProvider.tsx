'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '@/shared/lib/gsap'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const tickerRef = useRef<((time: number) => void) | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const tickerFn = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(tickerFn)
    gsap.ticker.lagSmoothing(0)
    tickerRef.current = tickerFn

    return () => {
      if (tickerRef.current) {
        gsap.ticker.remove(tickerRef.current)
        tickerRef.current = null
      }
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
