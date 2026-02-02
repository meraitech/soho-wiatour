'use client'

import { Media } from '@/payload-types'
import { STYLE_MARGIN_CONTAINER_BOTTOM } from '../constants/style/margin'
import { InfiniteMovingCards } from './ui/InfiniteMovingCard'

type Props = {
  gallery: Array<{
    image: Media
    id?: string
  }>
}

export default function FootageSection({ gallery }: Props) {
  return (
    <div
      className={
        'rounded-md flex flex-col gap-8 antialiased items-center justify-center relative overflow-hidden ' +
        STYLE_MARGIN_CONTAINER_BOTTOM
      }
    >
      <InfiniteMovingCards
        items={gallery}
        speed="slow"
        renderItem={(item, index) => (
          <div key={index} className="rounded-xl overflow-hidden bg-muted">
            <img
              src={item.image.url!}
              alt={`${item.image.alt}`}
              className="h-100 w-auto object-contain"
            />
          </div>
        )}
      />
      <InfiniteMovingCards
        items={gallery}
        speed="normal"
        direction="right"
        renderItem={(item, index) => (
          <div key={index} className="rounded-xl overflow-hidden bg-muted">
            <img
              src={item.image.url!}
              alt={`${item.image.alt}`}
              className="h-100 w-auto object-contain"
            />
          </div>
        )}
      />
    </div>
  )
}
