'use client'

import { useLayoutEffect, useRef } from 'react'
import type React from 'react'
import { gsap, Flip, ScrollTrigger } from '@/shared/lib/gsap'

type Params = {
    wrapRef: React.RefObject<HTMLDivElement | null>
    galleryRef: React.RefObject<HTMLDivElement | null>
    finalClass?: string
}

export function useBentoFlipScroll({
    wrapRef,
    galleryRef,
    finalClass = 'gallery-final',
}: Params) {
    const flipCtxRef = useRef<gsap.Context | null>(null)

    useLayoutEffect(() => {
        const gallery = galleryRef.current
        const wrap = wrapRef.current
        if (!gallery || !wrap) return

        const items = gallery.querySelectorAll<HTMLElement>('.gallery-item')

        const createTween = () => {
            // === 1:1 dengan kode mentah ===
            flipCtxRef.current && flipCtxRef.current.revert()
            gallery.classList.remove(finalClass)

            flipCtxRef.current = gsap.context(() => {
                // capture FINAL state
                gallery.classList.add(finalClass)
                const state = Flip.getState(items)
                gallery.classList.remove(finalClass)

                const flip = Flip.to(state, {
                    simple: true,
                    ease: 'expoScale(1, 5)',
                })

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: gallery,
                        start: 'center center',
                        end: '+=200%',
                        scrub: true,
                        pin: wrap,
                    },
                })

                tl.add(flip)

                // 🔑 SAMA PERSIS DENGAN KODE MENTAH
                return () => gsap.set(items, { clearProps: 'all' })
            })
        }

        createTween()
        window.addEventListener('resize', createTween)

        return () => {
            window.removeEventListener('resize', createTween)
            flipCtxRef.current?.revert()
            flipCtxRef.current = null
        }
    }, [wrapRef, galleryRef, finalClass])
}
