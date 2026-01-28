'use client'
import React, { useState } from 'react'

import { Container } from '@/shared/components/provider/Container'
import { Button } from '@/shared/components/ui/Button'
import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import {
  STYLE_MARGIN_CONTAINER,
  STYLE_MARGIN_CONTAINER_BOTTOM,
} from '@/shared/constants/style/margin'
import { STYLE_ROUNDED_CONTAINER } from '@/shared/constants/style/rounded'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { TourHighlight } from '@/features/tours/components/TourHighlight'
import id from '@/shared/assets/jsons/id.json'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { InfiniteMovingCards } from '@/shared/components/ui/InfiniteMovingCard'

/* ======================================================
   PAGE — Tour Detail
====================================================== */

export default function page() {
  const text = id.landing
  return (
    <div>
      {/* ======================================================
         SECTION HERO 
      ====================================================== */}
      <HeroSection />

      {/* ======================================================
         SECTION DETAIL TOUR
      ====================================================== */}
      <DetailSection />

      {/* ======================================================
         SECTION ITINERARY
      ====================================================== */}
      <ItinerarySection />

      {/* ======================================================
         SECTION IMAGE TRAIL❌
      ====================================================== */}
      <FootageSection />

      {/* ======================================================
          SECTION TOUR HIGHLIGHT
      ====================================================== */}
      <div className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        <TourHighlight />
      </div>
    </div>
  )

  /* =========================
       UI
    ========================= */
  /* ======================================================
     SECTION HERO
    ====================================================== */
  function HeroSection() {
    return (
      <section className={STYLE_MARGIN_CONTAINER}>
        <Container className="flex flex-col gap-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-8 items-center">
            <span>Paket Wisata Internasional</span>
            <TypographyH1>Tour 3 Negara Singapura, Malaysia dan Thailand</TypographyH1>
            <Button className="mt-4">Pesan Sekarang</Button>
          </div>

          {/* img  */}
          <div className={'w-full aspect-video overflow-hidden relative' + STYLE_ROUNDED_CONTAINER}>
            <img src="/images/footer.webp" alt="" className="w-full h-full object-cover" />
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
     SECTION DETAIL
    ====================================================== */
  function DetailSection() {
    return (
      <section className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        <Container className="flex flex-col gap-14">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4 justify-center">
              <TypographyH2 className="mb-4">Detail Perjalanan</TypographyH2>
              <TypographyP>
                Perjalanan ini dirancang untuk Anda yang ingin menjelajahi tiga negara Asia Tenggara
                dalam satu rangkaian perjalanan yang efisien dan nyaman. Setiap destinasi dipilih
                untuk memberikan keseimbangan antara wisata kota, budaya, dan pengalaman lokal.
              </TypographyP>
              <TypographyP>
                Selama perjalanan, Anda akan mengunjungi landmark ikonik, pusat perbelanjaan, serta
                area wisata populer yang menjadi daya tarik utama di masing-masing negara.
              </TypographyP>
            </div>
            <div className="ml-auto bg-accent w-full md:max-w-120 max-md:aspect-5/3 aspect-square"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex flex-col gap-4 justify-center md:order-2">
              <TypographyP>
                Selain destinasi unggulan, perjalanan ini juga memberikan waktu yang cukup untuk
                beristirahat dan menikmati suasana kota. Itinerary disusun agar tidak terlalu padat,
                sehingga Anda dapat menikmati setiap momen perjalanan dengan lebih santai.
              </TypographyP>
              <TypographyP>
                Dengan pendampingan tim berpengalaman, setiap proses perjalanan—mulai dari
                keberangkatan hingga kepulangan—berjalan dengan tertib dan aman.
              </TypographyP>
            </div>
            <div className="mr-auto bg-accent w-full md:max-w-120  max-md:aspect-5/3 aspect-square"></div>
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
     SECTION TOUR HIGHLIGHT
    ====================================================== */
  function ItinerarySection() {
    const itinerary = [
      {
        imgUrl: '',
        title: 'Day 1: Ngumpul di Bandara',
        description:
          'Hari ini peserta akan mengunjungi berbagai ikon wisata Singapura, termasuk kawasan kota modern dan destinasi populer.',
      },
      {
        imgUrl: '',
        title: 'Day 2: City Tour Singapura',
        description:
          'Hari ini peserta akan mengunjungi berbagai ikon wisata Singapura, termasuk kawasan kota modern dan destinasi populer.',
      },
      {
        imgUrl: '',
        title: 'Day 3: Singapura - Johor Bahru',
        description:
          'Hari ini peserta akan mengunjungi berbagai ikon wisata Singapura, termasuk kawasan kota modern dan destinasi populer.',
      },
      {
        imgUrl: '',
        title: 'Day 4: Singapura - Johor Bahru',
        description:
          'Hari ini peserta akan mengunjungi berbagai ikon wisata Singapura, termasuk kawasan kota modern dan destinasi populer.',
      },
      {
        imgUrl: '',
        title: 'Day 5: Singapura - Johor Bahru',
        description:
          'Hari ini peserta akan mengunjungi berbagai ikon wisata Singapura, termasuk kawasan kota modern dan destinasi populer.',
      },
      {
        imgUrl: '',
        title: 'Day 6: Singapura - Johor Bahru',
        description:
          'Hari ini peserta akan mengunjungi berbagai ikon wisata Singapura, termasuk kawasan kota modern dan destinasi populer.',
      },
      {
        imgUrl: '',
        title: 'Day 7: Singapura - Johor Bahru asdas d',
        description:
          'Hari ini peserta akan mengunjungi berbagai ikon wisata Singapura, termasuk kawasan kota modern dan destinasi populer.',
      },
    ]

    // 🔑 state utama
    const [activeIndex, setActiveIndex] = useState(0)
    const activeItem = itinerary[activeIndex]

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
              {itinerary.map((item, index) => {
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
                    <span className="text-xl line-clamp-1">{item.title}</span>

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

              <TypographyH3>{activeItem.title}</TypographyH3>

              <TypographyP>{activeItem.description}</TypographyP>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  function FootageSection() {
    const footages = [
      {
        imgUrl:
          'https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Trans 7',
      },
      {
        imgUrl:
          'https://plus.unsplash.com/premium_photo-1663040271283-bd044a62da1a?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Trans 7',
      },
      {
        imgUrl:
          'https://images.unsplash.com/photo-1519922639192-e73293ca430e?q=80&w=2372&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Trans 7',
      },
      {
        imgUrl:
          'https://images.unsplash.com/photo-1489516408517-0c0a15662682?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Trans 7',
      },
    ]

    return (
      <div
        className={
          'rounded-md flex flex-col gap-8 antialiased items-center justify-center relative overflow-hidden ' +
          STYLE_MARGIN_CONTAINER_BOTTOM
        }
      >
        <InfiniteMovingCards
          items={footages}
          speed="slow"
          renderItem={(item, index) => (
            <div key={index} className="rounded-xl overflow-hidden bg-muted">
              <img
                src={item.imgUrl}
                alt={`${item.title} Photo`}
                className="h-100 w-auto object-contain"
              />
            </div>
          )}
        />
        <InfiniteMovingCards
          items={footages}
          speed="slow"
          direction="right"
          renderItem={(item, index) => (
            <div key={index} className="rounded-xl overflow-hidden bg-muted">
              <img
                src={item.imgUrl}
                alt={`${item.title} Photo`}
                className="h-100 w-auto object-contain"
              />
            </div>
          )}
        />
      </div>
    )
  }
}
