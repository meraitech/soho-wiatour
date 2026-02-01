'use client'

import { Media } from '@/payload-types'
import { Container } from '@/shared/components/provider/Container'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { STYLE_MARGIN_CONTAINER_BOTTOM } from '@/shared/constants/style/margin'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
  // 🔑 state utama
  console.log(itineraries)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = itineraries[activeIndex]

  return (
    <section className={STYLE_MARGIN_CONTAINER_BOTTOM}>
      <Container className="flex flex-col gap-14">
        {/* Title */}
        <div className="flex flex-col gap-4">
          <span>Rangkaian Perjalanan</span>
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
                  className={`
                    py-4 border-b w-full flex justify-between items-center
                    transition-colors duration-300 cursor-pointer 
                    ${isActive ? 'bg-foreground/10' : 'hover:bg-foreground/5'}
                  `}
                >
                  <span className="text-xl line-clamp-1">
                    {'Day' + item.day + ': ' + item.activityName}
                  </span>

                  <div
                    className={`
                      w-12 h-12 p-4 border flex items-center justify-center rounded-full
                      transition-transform duration-300
                      ${isActive ? 'rotate-0' : '-rotate-45'}
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
            <div className="w-full aspect-video bg-amber-800 rounded-xl" />

            <TypographyH3>{activeItem.activityName}</TypographyH3>

            <TypographyP>{activeItem.description}</TypographyP>
          </div>
        </div>
      </Container>
    </section>
  )
}
