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
  //   const footages = [
  //     {
  //       imgUrl:
  //         'https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       title: 'Trans 7',
  //     },
  //     {
  //       imgUrl:
  //         'https://plus.unsplash.com/premium_photo-1663040271283-bd044a62da1a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       title: 'Trans 7',
  //     },
  //     {
  //       imgUrl:
  //         'https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       title: 'Trans 7',
  //     },
  //     {
  //       imgUrl:
  //         'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  //       title: 'Trans 7',
  //     },
  //   ]

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
              alt={`${item.image.alt} Photo`}
              className="h-100 w-auto object-contain"
            />
          </div>
        )}
      />
      <InfiniteMovingCards
        items={gallery}
        speed="slow"
        direction="right"
        renderItem={(item, index) => (
          <div key={index} className="rounded-xl overflow-hidden bg-muted">
            <img
              src={item.image.url!}
              alt={`${item.image.alt} Photo`}
              className="h-100 w-auto object-contain"
            />
          </div>
        )}
      />
    </div>
  )
}
