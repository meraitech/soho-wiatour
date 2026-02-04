'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { Button } from '../ui/Button'

/* ======================================================
   TYPES
====================================================== */

export type CardNavLink = {
  label: string
  href: string
  ariaLabel: string
}

export interface CardNavProps {
  logo: string
  logoAlt?: string
  items: CardNavLink[]
  className?: string
  ease?: string
  baseColor?: string
  menuColor?: string
  actionHref: string
}

/* ======================================================
   COMPONENT
====================================================== */

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  className = '',
  ease = 'power3.out',
  baseColor = '#fff',
  menuColor = '#000',
  actionHref,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)

  const navRef = useRef<HTMLDivElement | null>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])
  const tlRef = useRef<gsap.core.Timeline | null>(null)

  // 🔑 PERFORMANCE FIX: simpan height sekali
  const expandedHeightRef = useRef<number>(260)

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el
  }

  /* ======================================================
     HEIGHT MEASUREMENT (ONCE)
  ====================================================== */
  const measureExpandedHeight = () => {
    const navEl = navRef.current
    if (!navEl) return

    const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement
    if (!contentEl) return

    // Simpan state
    const prevHeight = navEl.style.height
    const prevVisibility = contentEl.style.visibility
    const prevPointer = contentEl.style.pointerEvents
    const prevPosition = contentEl.style.position

    // Paksa tampil TANPA animasi
    navEl.style.height = 'auto'
    contentEl.style.visibility = 'visible'
    contentEl.style.pointerEvents = 'auto'
    contentEl.style.position = 'static'

    // Force layout sekali
    expandedHeightRef.current = navEl.offsetHeight

    // Balikin state awal
    navEl.style.height = prevHeight || '60px'
    contentEl.style.visibility = prevVisibility
    contentEl.style.pointerEvents = prevPointer
    contentEl.style.position = prevPosition
  }

  /* ======================================================
     GSAP INIT (ONCE)
  ====================================================== */
  useLayoutEffect(() => {
    const navEl = navRef.current
    if (!navEl) return

    // ⛔ hitung height SEKALI
    measureExpandedHeight()

    // Initial state (SAMA seperti sebelumnya)
    gsap.set(navEl, { height: 60, overflow: 'hidden' })
    gsap.set(cardsRef.current, { y: 50, opacity: 0, willChange: 'transform, opacity' })

    const tl = gsap.timeline({ paused: true })

    tl.to(navEl, {
      height: expandedHeightRef.current, // 🔑 pakai cached height
      duration: 0.4,
      ease,
    })

    tl.to(
      cardsRef.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease,
        stagger: 0.08,
      },
      '-=0.1',
    )

    tlRef.current = tl

    return () => {
      tl.kill()
      tlRef.current = null
    }
  }, [ease])

  /* ======================================================
     TOGGLE MENU
  ====================================================== */
  const toggleMenu = () => {
    const tl = tlRef.current
    if (!tl) return

    if (!isExpanded) {
      setIsHamburgerOpen(true)
      setIsExpanded(true)
      tl.play(0)
    } else {
      setIsHamburgerOpen(false)
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false))
      tl.reverse()
    }
  }

  /* ======================================================
     RENDER
  ====================================================== */
  return (
    <div
      className={`card-nav-container absolute left-1/2 -translate-x-1/2 w-[90%] max-w-200 z-50 top-[1.2em] md:top-[2em] ${className}`}
    >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? 'open rounded-4xl' : 'rounded-full'} block h-15 p-0 shadow-md relative overflow-hidden will-change-[height]`}
        style={{ backgroundColor: baseColor }}
      >
        {/* ================= TOP BAR ================= */}
        <div className="card-nav-top absolute inset-x-0 top-0 h-15 flex items-center justify-between p-2 pl-[1.1rem] z-2">
          {/* HAMBURGER */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? 'open' : ''} group h-full px-2 flex flex-col items-center justify-center cursor-pointer gap-1.5`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? 'Close menu' : 'Open menu'}
            tabIndex={0}
            style={{ color: menuColor }}
          >
            <div
              className={`hamburger-line w-7.5 h-0.5 bg-current transition-transform duration-300 ${
                isHamburgerOpen ? 'translate-y-1 rotate-45' : ''
              }`}
            />
            <div
              className={`hamburger-line w-7.5 h-0.5 bg-current transition-transform duration-300 ${
                isHamburgerOpen ? '-translate-y-1 -rotate-45' : ''
              }`}
            />
          </div>

          {/* LOGO */}
          <div className="logo-container flex items-center md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 max-md:pr-4">
            <Image src={logo} alt={logoAlt} width={1280} height={800} className="logo h-7 w-auto" />
          </div>

          {/* CTA */}
          <Button href={actionHref} className="max-md:hidden" variant="color">
            Hubungi Kami
          </Button>
        </div>

        {/* ================= CONTENT ================= */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-15 bottom-0 p-4 grid grid-cols-2 gap-3 ${
            isExpanded ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
          aria-hidden={!isExpanded}
        >
          {/* LEFT CARD */}
          <div
            className="nav-card flex flex-col gap-2 p-[12px_16px] rounded-4xl"
            ref={setCardRef(0)}
          >
            {items.map((lnk, i) => (
              <a
                key={`${lnk.label}-${i}`}
                href={lnk.href}
                aria-label={lnk.ariaLabel}
                className="flex items-center gap-2 text-[15px] md:text-[16px] hover:opacity-75 transition-opacity"
              >
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="transition-transform group-hover:rotate-45"
                />
                {lnk.label}
              </a>
            ))}
          </div>

          {/* RIGHT CARD */}
          <div className="nav-card hidden md:block rounded-3xl overflow-hidden" ref={setCardRef(1)}>
            <Image
              src="/assets/web/layout/navbar.webp"
              alt="Foto Utama Wiatour bersama di Luar Negeri"
              width={1280}
              height={800}
              draggable={false}
              className="w-full h-full object-cover scale-125"
            />
          </div>
        </div>
      </nav>
    </div>
  )
}

export default CardNav
