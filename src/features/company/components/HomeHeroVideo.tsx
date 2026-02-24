'use client'

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '@/shared/lib/gsap'

export function HomeHeroVideo() {
  const videoRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    if (!videoRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(videoRef.current, {
        scale: 0.7,
        transformOrigin: 'top center',
      })

      gsap.to(videoRef.current, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: videoRef.current,
          start: 'top 60%',
          end: '60% 60%',
          scrub: true,
        },
      })
    }, videoRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={videoRef} className="w-full relative h-screen rounded-3xl overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/web/home/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    </div>
  )
}
