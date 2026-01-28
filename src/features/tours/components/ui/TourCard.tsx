import React from 'react'
import Link from 'next/link'

import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { STYLE_ROUNDED_CARD } from '@/shared/constants/style/rounded'
import clsx from 'clsx'

type Props = {
  href?: string
  width?: 'w-full' | 'w-[330px]' | string
}

export const TourCard = ({ width = 'w-full', href = 'indonesia' }: Props) => {
  return (
    <Link href={'/tours/' + href} draggable={false} className="group">
      <section
        className={clsx(
          'flex flex-col aspect-3/4 relative group overflow-hidden shrink-0',
          width,
          STYLE_ROUNDED_CARD,
        )}
      >
        <div className="z-5 flex flex-col justify-end h-full w-full p-6">
          <TypographyH3 className="text-background">
            Tour 3 Negara Singapura, Malaysia dan Thailand
          </TypographyH3>
        </div>

        <div className="absolute inset-0 bg-foreground">
          <img
            src="./brand/logo/m-1.webp"
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 duration-300"
          />
        </div>
      </section>
    </Link>
  )
}
