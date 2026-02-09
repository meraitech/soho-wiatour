'use client'

import { Media } from '@/payload-types'
import { Container } from '@/shared/components/provider/Container'
import { BaseImage } from '@/shared/components/ui/BaseImage'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { STYLE_MARGIN_CONTAINER_BOTTOM } from '@/shared/constants/style/margin'
import { resolveMediaUrl } from '@/shared/utils/resolveMediaUrl'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useState } from 'react'

type Props = {
  itineraries: Array<{
    day: number
    activityName: string
    icon: Media
    thumbnail: Media
    description: string
    id?: string
  }>
}

export default function ItinerarySection({ itineraries }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = itineraries[activeIndex]

  return (
    <section className={STYLE_MARGIN_CONTAINER_BOTTOM}>
      <Container className="flex flex-col gap-14">
        {/* Title */}
        <div className="flex flex-col gap-4">
          <span className="md:text-lg">Rangkaian Perjalanan</span>
          <TypographyH2>Detail Itinerary</TypographyH2>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT */}
          <div className="flex flex-col max-md:order-2">
            {itineraries.map((item, index) => {
              const isActive = index === activeIndex

              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`p-4 border-b w-full flex justify-between items-center group transition-colors duration-300 cursor-pointer ${isActive ? 'bg-primary/15' : 'hover:bg-primary/10'} `}
                >
                  <span className="lg:text-xl text-lg line-clamp-1 w-full text-start">
                    {'Day ' + item.day + ': ' + item.activityName}
                  </span>

                  <div
                    className={`
                      w-12 h-12 p-4 border flex items-center justify-center rounded-full
                      transition-transform duration-300
                      ${isActive ? 'rotate-0' : '-rotate-45 group-hover:rotate-0'}
                    `}
                  >
                    <FontAwesomeIcon icon={faArrowRight} />
                  </div>
                </button>
              )
            })}
          </div>

          {/* RIGHT */}
          <div
            key={activeIndex}
            className="
              flex flex-col gap-4
              animate-fade max-md:order-1
            "
          >
            <div className="w-full aspect-video bg-muted rounded-xl overflow-hidden relative">
              <BaseImage
                src={resolveMediaUrl(activeItem.thumbnail.url!)}
                alt={activeItem.thumbnail.alt}
                className="w-full h-full object-cover"
                fill
                priority
              />
            </div>

            <TypographyH3>{activeItem.activityName}</TypographyH3>

            <TypographyP>{activeItem.description}</TypographyP>
          </div>
        </div>
      </Container>
    </section>
  )
}
