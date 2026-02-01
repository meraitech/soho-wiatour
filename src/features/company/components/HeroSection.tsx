'use client'

import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { faComputerMouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRef, useLayoutEffect } from 'react'
import { useBentoFlipScroll } from '../hooks/useBentoFlipScroll'
import id from '@/shared/assets/jsons/id.json'
import { Button } from '@/shared/components/ui/Button'

export default function HeroSection() {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const text = id.landing

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const heroTitle = gsap.utils.toArray<HTMLDivElement>('.hero-title')

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'center top',
          scrub: true,
        },
      })

      tl.to(heroTitle, {
        autoAlpha: 0,
      })

      tl.from(
        galleryRef.current,
        {
          opacity: 0.7,
          ease: 'none',
        },
        '<',
      )
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  useBentoFlipScroll({ wrapRef, galleryRef })

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
    'https://images.unsplash.com/photo-1718876688960-4ae86c2f33d1?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1500981458086-b8a11cd163af?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1626603503426-deaafeccedc9?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1595628218785-bf323bcc3ecc?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1741320159899-df923b71de08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1712141481069-793132cc5769?q=80&w=1336&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1566908463863-abb4672c53a2?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1694860843772-9fd8747f189f?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ]
  return (
    <section
      ref={wrapRef}
      className="relative w-full bg-foreground h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        ref={galleryRef}
        className="
          grid gap-[1.5vh]
          grid-cols-[repeat(3,32.5vw)]
          grid-rows-[repeat(4,23vh)]
          justify-center content-center
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

      <div className="hero-title z-5 text-background flex flex-col items-center absolute w-full h-full top-0 left-0 justify-between py-10">
        <div />
        <div className="flex flex-col items-center lg:gap-12 md:gap-8 gap-6 xl:max-w-5xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl max-xl duration-300">
          <TypographyH1 className="text-center">{text.hero.title}</TypographyH1>
          <div className="flex md:gap-6 gap-4">
            <Button size="lg">{text.hero.ctaPrimary}</Button>
            <Button variant="monocrome_white" size="lg">
              {text.hero.ctaSecondary}
            </Button>
          </div>
        </div>
        <div className="flex items-center border py-2 px-4 rounded-full md:gap-4 gap-2 text-background/30 text-sm animate-bounce backdrop-blur-sm">
          <span>Scroll Down</span>
          <FontAwesomeIcon icon={faComputerMouse} />
        </div>
      </div>
    </section>
  )
}
