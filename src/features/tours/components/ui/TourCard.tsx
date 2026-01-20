import Link from 'next/link'
import React from 'react'
import { Button } from '@/shared/components/ui/Button'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { STYLE_ROUNDED_CARD } from '@/shared/constants/style/rounded'

type Props = {
  scrollRef: React.RefObject<HTMLDivElement | null>
  startScrollLeftRef: React.MutableRefObject<number>
}

export const TourCard = ({ scrollRef, startScrollLeftRef }: Props) => {
  return (
    <Link
      href="/asd"
      draggable={false}
      className={'shrink-0 bg-foreground overflow-hidden ' + STYLE_ROUNDED_CARD}
      onClickCapture={(e) => {
        if (!scrollRef.current) return

        // 🔥 FINAL RULE: scroll berubah = drag
        if (scrollRef.current.scrollLeft !== startScrollLeftRef.current) {
          e.preventDefault()
          e.stopPropagation()
        }
      }}
    >
      <section className="flex flex-col aspect-3/4 h-110 relative group">
        <div className="z-10 flex flex-col justify-end h-full w-full p-6">
          <TypographyH3 className="text-background">
            Tour 3 Negara Singapura, Malaysia dan Thailand
          </TypographyH3>

          <Button variant="monocrome_white" className="w-full mt-4">
            More Detail
          </Button>
        </div>

        <div className="absolute inset-0">
          <img src="./brand/logo-mark.svg" alt="" className="w-full h-full object-cover" />
        </div>
      </section>
    </Link>
  )
}
