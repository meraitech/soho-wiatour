'use client'

import { ReactNode, useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { useAnimationFrame } from 'motion/react'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08, // smoothness
      smoothWheel: true, // desktop wheel smoothing
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useAnimationFrame((time) => {
    lenisRef.current?.raf(time)
  })

  return <>{children}</>
}
