import React from 'react'
import Link from 'next/link'
import { STYLE_ROUNDED_CARD } from '@/shared/constants/style/rounded'
import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  title: string
  imgUrl: string
  imgAlt: string
  slug: string
  width?: 'w-full' | 'w-[330px]' | string
}

export const TourCard = ({ width = 'w-full', slug, title, imgUrl, imgAlt }: Props) => {
  return (
    <Link href={'/tours/' + slug} draggable={false} className="group">
      <section
        className={clsx(
          'flex flex-col aspect-3/4 relative group overflow-hidden shrink-0',
          width,
          STYLE_ROUNDED_CARD,
        )}
      >
        <div className="z-5 flex flex-col justify-end h-full w-full p-6 bg-linear-to-t from-foreground/80 via-transparent">
          <h3 className="text-background line-clamp-2 g:text-3xl md:text-2xl text-xl">{title}</h3>
        </div>

        <div className="absolute inset-0 bg-muted">
          <Image
            src={imgUrl}
            alt={imgAlt}
            width={800}
            height={1280}
            className="w-full h-full object-cover group-hover:scale-105 duration-300"
          />
        </div>
      </section>
    </Link>
  )
}
