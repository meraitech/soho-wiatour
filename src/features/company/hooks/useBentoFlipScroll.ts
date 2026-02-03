'use client'

import { useLayoutEffect, useRef } from 'react'
import type React from 'react'
import { gsap, Flip } from '@/shared/lib/gsap'

type Params = {
    heroWrapRef: React.RefObject<HTMLDivElement | null>
    heroGalleryRef: React.RefObject<HTMLDivElement | null>
    finalClass?: string
}

export function useBentoFlipScroll({
    heroWrapRef,
    heroGalleryRef,
    finalClass = 'gallery-final',
}: Params) {
    const flipCtxRef = useRef<gsap.Context | null>(null)

    useLayoutEffect(() => {
        const gallery = heroGalleryRef.current
        const wrap = heroWrapRef.current
        if (!gallery || !wrap) return

        const items = gallery.querySelectorAll<HTMLElement>('.gallery-item')

        const createTween = () => {
            // 🧨 KILL SEBELUM REBUILD
            flipCtxRef.current?.revert()
            gallery.classList.remove(finalClass)

            flipCtxRef.current = gsap.context(() => {
                /**
                 * 1️⃣ CAPTURE STATE AWAL (SATU BESAR)
                 * layout awal = TANPA finalClass
                 */
                const state = Flip.getState(items)

                /**
                 * 2️⃣ APPLY GRID (BANYAK)
                 */
                gallery.classList.add(finalClass)

                /**
                 * 3️⃣ FLIP MENUJU GRID
                 */
                const flip = Flip.to(state, {
                    simple: true,
                    ease: 'expoScale(1, 5)',
                })

                /**
                 * 4️⃣ SCROLL CONTROL
                 */
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

                return () => {
                    gsap.set(items, { clearProps: 'all' })
                }
            })
        }

        createTween()
        window.addEventListener('resize', createTween)

        return () => {
            window.removeEventListener('resize', createTween)
            flipCtxRef.current?.revert()
            flipCtxRef.current = null
        }
    }, [heroWrapRef, heroGalleryRef, finalClass])
}
