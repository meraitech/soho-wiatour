import React from 'react'
import Link from 'next/link'

import { Button } from '@/shared/components/ui/Button'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { STYLE_ROUNDED_CARD } from '@/shared/constants/style/rounded'
import clsx from 'clsx'

type Props = {
  href?: string
  width?: 'w-full' | 'w-[330px]'
}

export const TourCard = ({ width = 'w-full', href = '/asd' }: Props) => {
  return (
    <Link href={href} draggable={false}>
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

          <Button variant="monocrome_white" className="w-full mt-4">
            More Detail
          </Button>
        </div>

        <div className="absolute inset-0 bg-foreground">
          <img src="./brand/logo/m-1.webp" alt="" className="w-full h-full object-cover" />
        </div>
      </section>
    </Link>
  )
}
