import React from 'react'

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
import CTASection from '@/shared/components/CTASection'
import id from '@/shared/assets/jsons/id.json'

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
         SECTION ITINERARY❌
      ====================================================== */}

      {/* ======================================================
         SECTION IMAGE TRAIL❌
      ====================================================== */}

      {/* ======================================================
          SECTION TOUR HIGHLIGHT
      ====================================================== */}
      <TourHighlight />

      {/* ======================================================
          SECTION CTA 
      ====================================================== */}
      <CTASection
        item={{
          quote: text.cta.quote,
          button1: text.cta.button1,
          button2: text.cta.button2,
        }}
      />
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
          <div className="grid grid-cols-2 gap-12">
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
            <div className="ml-auto bg-accent w-full max-w-120 aspect-5/3"></div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="mr-auto bg-accent w-full max-w-120 aspect-5/3"></div>
            <div className="flex flex-col gap-4 justify-center">
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
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
     SECTION TOUR HIGHLIGHT
    ====================================================== */
  function TourHighligh() {}
}
