'use client'

import { Media } from '@/payload-types'
import { STYLE_MARGIN_CONTAINER_BOTTOM } from '../constants/style/margin'
import { InfiniteMovingCards } from './ui/InfiniteMovingCard'
import Image from 'next/image'
import { BaseImage } from './ui/BaseImage'
import { resolveMediaUrl } from '../utils/resolveMediaUrl'

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
        'rounded-md flex flex-col md:gap-8 gap-6 antialiased items-center justify-center relative overflow-hidden ' +
        STYLE_MARGIN_CONTAINER_BOTTOM
      }
    >
      <InfiniteMovingCards
        items={gallery}
        speed="slow"
        renderItem={(item, index) => (
          <div key={index} className="rounded-xl overflow-hidden bg-muted">
            <BaseImage
              src={resolveMediaUrl(item.image.url!)}
              alt={`${item.image.alt}`}
              className="lg:h-100 md:h-70 h-50 w-auto object-contain duration-300"
              width={1200}
              height={800}
              loading="lazy"
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
            <BaseImage
              src={resolveMediaUrl(item.image.url!)}
              alt={`${item.image.alt}`}
              className="lg:h-100 md:h-70 h-50 w-auto object-contain duration-300"
              width={1200}
              height={800}
              loading="lazy"
            />
          </div>
        )}
      />
    </div>
  )
}
