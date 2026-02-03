'use client'

import React, { useRef, useLayoutEffect, useState, PropsWithChildren } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'motion/react'

/* ======================================================
   Types
====================================================== */

interface VelocityMapping {
  input: [number, number]
  output: [number, number]
}

interface VelocityScrollerProps {
  /** Any React node: card, image, grid, text, etc */
  children: React.ReactNode

  /** Base horizontal speed (px/sec) */
  baseVelocity?: number

  /** Optional scroll container */
  scrollContainerRef?: React.RefObject<HTMLElement>

  /** Copies of children for infinite loop */
  numCopies?: number

  /** Spring config */
  damping?: number
  stiffness?: number

  /** Scroll → velocity factor mapping */
  velocityMapping?: VelocityMapping

  /** Wrapper styles */
  className?: string
  style?: React.CSSProperties

  /** Track (flex row) styles */
  trackClassName?: string
  trackStyle?: React.CSSProperties
}

/* ======================================================
   Utils
====================================================== */

function wrap(min: number, max: number, v: number): number {
  const range = max - min
  return ((((v - min) % range) + range) % range) + min
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    if (!ref.current) return

    const update = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
      }
    }

    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [ref])

  return width
}

/* ======================================================
   Hook: Scroll Velocity
====================================================== */

function useScrollVelocity({
  scrollContainerRef,
  damping = 50,
  stiffness = 400,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
}: {
  scrollContainerRef?: React.RefObject<HTMLElement>
  damping?: number
  stiffness?: number
  velocityMapping?: VelocityMapping
}) {
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {}

  const { scrollY } = useScroll(scrollOptions)
  const rawVelocity = useVelocity(scrollY)

  const smoothVelocity = useSpring(rawVelocity, {
    damping,
    stiffness,
  })

  return useTransform(smoothVelocity, velocityMapping.input, velocityMapping.output, {
    clamp: false,
  })
}

/* ======================================================
   Component: VelocityScroller (Generic)
====================================================== */

export const VelocityScroller: React.FC<PropsWithChildren<VelocityScrollerProps>> = ({
  children,
  baseVelocity = 120,
  scrollContainerRef,
  numCopies = 6,
  damping = 50,
  stiffness = 400,
  velocityMapping,
  className,
  style,
  trackClassName,
  trackStyle,
}) => {
  const baseX = useMotionValue(0)
  const directionRef = useRef(1)

  const velocityFactor = useScrollVelocity({
    scrollContainerRef,
    damping,
    stiffness,
    velocityMapping,
  })

  const measureRef = useRef<HTMLDivElement>(null)
  const contentWidth = useElementWidth(measureRef)

  const x = useTransform(baseX, (v) => (contentWidth ? `${wrap(-contentWidth, 0, v)}px` : '0px'))

  useAnimationFrame((_, delta) => {
    let moveBy = directionRef.current * baseVelocity * (delta / 1000)
    const vf = velocityFactor.get()

    if (vf < 0) directionRef.current = -1
    else if (vf > 0) directionRef.current = 1

    moveBy += directionRef.current * moveBy * vf
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className={`relative overflow-hidden ${className ?? ''}`} style={style}>
      <motion.div className={`flex ${trackClassName ?? ''}`} style={{ x, ...trackStyle }}>
        {Array.from({ length: numCopies }).map((_, i) => (
          <div key={i} ref={i === 0 ? measureRef : null} className="shrink-0">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  )
}

/* ======================================================
   Example Usage (Optional – remove in production)
====================================================== */

/*
<VelocityScroller
  baseVelocity={140}
  numCopies={5}
  trackClassName="gap-6"
>
  <YourCardComponent />
</VelocityScroller>
*/
