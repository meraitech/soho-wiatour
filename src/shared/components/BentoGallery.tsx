'use client'

import { useBentoFlipScroll } from '@/features/company/hooks/useBentoFlipScroll'
import { useRef } from 'react'
import { TypographyH1 } from './ui/TypographyH1'
import id from '@/shared/assets/jsons/id.json'
import { Button } from './ui/Button'

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
  'https://assets.codepen.io/16327/portrait-pattern-1.jpg',
  'https://assets.codepen.io/16327/portrait-image-12.jpg',
  'https://assets.codepen.io/16327/portrait-image-8.jpg',
  'https://assets.codepen.io/16327/portrait-pattern-2.jpg',
  'https://assets.codepen.io/16327/portrait-image-4.jpg',
  'https://assets.codepen.io/16327/portrait-image-3.jpg',
  'https://assets.codepen.io/16327/portrait-pattern-3.jpg',
  'https://assets.codepen.io/16327/portrait-image-1.jpg',
]

export default function BentoGallery() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const galleryRef = useRef<HTMLDivElement | null>(null)

  useBentoFlipScroll({ wrapRef, galleryRef })

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-screen bg-foreground flex items-center justify-center overflow-hidden"
    >
      <div
        ref={galleryRef}
        className="
          grid gap-[1vh]
          grid-cols-[repeat(3,32.5vw)]
          grid-rows-[repeat(4,23vh)]
          justify-center content-center
          opacity-40
        "
      >
        {images.map((src, i) => (
          <div
            key={i}
            className={`gallery-item relative overflow-hidden rounded-2xl ${gridAreas[i]}`}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
      </div>

      <div className="z-5 text-background flex flex-col items-center gap-12 max-w-4xl absolute">
        <TypographyH1 className="text-center">{id.hero.title}</TypographyH1>
        <div className="flex gap-6">
          <Button size="lg">{id.hero.ctaPrimary}</Button>
          <Button variant="monocrome_white" size="lg">
            {id.hero.ctaSecondary}
          </Button>
        </div>
      </div>
    </div>
  )
}
