import { TourHighlight } from '@/features/tours/components/TourHighlight'
import { HeaderSection } from '@/shared/components/HeaderSection'
import { Container } from '@/shared/components/provider/Container'
import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import {
  STYLE_MARGIN_CONTAINER,
  STYLE_MARGIN_CONTAINER_BOTTOM,
  STYLE_MARGIN_CONTAINER_TOP,
} from '@/shared/constants/style/margin'
import { STYLE_ROUNDED_CONTAINER } from '@/shared/constants/style/rounded'
import { faEye, faTasks, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import React from 'react'

export default function Page() {
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
         SECTION CEO QUOTES
      ====================================================== */}
      <CEOQuotesSection />

      {/* ======================================================
         SECTION CEO QUOTES
      ====================================================== */}
      <VisionMissionSection />

      {/* ======================================================
         SECTION TOUR HIGHLIGHT
      ====================================================== */}
      <TourHighlight currentTourId="" />
      <div className={STYLE_MARGIN_CONTAINER_BOTTOM} />
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
            <span>Tentang Wiatour</span>
            <TypographyH1>Membawa Anda Lebih Dekat pada Setiap Cerita Perjalanan</TypographyH1>
          </div>

          {/* img  */}
          <div className={'w-full aspect-video overflow-hidden relative' + STYLE_ROUNDED_CONTAINER}>
            <Image
              src="/assets/web/about/hero.webp"
              alt="Photo Semua Team Wiatour"
              width={1280}
              height={800}
              className="w-full h-full object-cover scale-110"
            />
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
            <div className="flex flex-col gap-4 justify-center lg:w-6/7 duration-300">
              <TypographyH2 className="mb-4">Mengenal Wiatour Lebih Dekat</TypographyH2>
              <TypographyP>
                Wiatour adalah agen tour & travel yang berkomitmen menghadirkan perjalanan yang
                aman, terencana, dan berkesan. Kami melayani berbagai kebutuhan perjalanan—mulai
                dari paket wisata, tiket transportasi, hingga layanan perjalanan khusus—dengan
                standar pelayanan profesional. melayani berbagai kebutuhan perjalanan—mulai dari
                paket wisata, tiket transportasi, hingga layanan perjalanan khusus—dengan standar
                pelayanan profesional. melayani berbagai kebutuhan perjalanan—mulai dari paket
                wisata, tiket transportasi, hingga layanan perjalanan khusus—dengan standar
                pelayanan profesional.
              </TypographyP>
            </div>
            <div className="ml-auto bg-accent w-full md:max-w-120 md:aspect-6/7 aspect-video relative overflow-hidden rounded-3xl">
              <Image
                src="/assets/web/about/about.webp"
                alt="Photo CEO Wiradrana dan Team"
                width={1280}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
    SECTION CEO QUOTES
  ====================================================== */
  function CEOQuotesSection() {
    return (
      <section id="ceo" className={STYLE_MARGIN_CONTAINER}>
        <Container className="flex max-lg:flex-col gap-14">
          <div className="ml-auto bg-muted w-full lg:w-110 shrink-0 aspect-square relative overflow-hidden rounded-3xl">
            <Image
              src="/assets/web/about/ceo.webp"
              alt="Photo CEO Wiradrana Putri Harefa"
              width={1280}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-24 justify-center lg:w-6/7 duration-300">
            <div>
              <h2 className="sr-only">CEO Quote</h2>
              <blockquote className="flex md:text-2xl text-xl mb-6">{`"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s"`}</blockquote>
              <span className="font-medium ">
                Wiradrana Putri Harefa, S.Psi.{' '}
                <span className="text-paragraph">Chief Executive Officer</span>{' '}
              </span>
            </div>
            <span className="text-2xl">
              7+ <span className="text-paragraph">Tahun Pengalaman</span>
            </span>
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
    SECTION VISION MISSION
  ====================================================== */
  function VisionMissionSection() {
    const VMCard = ({
      title,
      icon,
      h3,
      p,
      imgUrl,
      position = 'left',
    }: {
      title: string
      icon: IconDefinition
      h3: string
      p: string
      imgUrl: string
      position?: 'left' | 'right'
    }) => {
      return (
        <div className="w-full grid md:grid-cols-2 gap-8 overflow-hidden">
          <div className={`flex ${position == 'right' && 'order-2'}`}>
            <div
              className={`service-step flex flex-col w-full my-auto max-md:order-1 md:max-w-100 gap-4 `}
            >
              <TitleSmallWithIcon text={title} icon={icon} />

              <TypographyH3 className="mb-2">{h3}</TypographyH3>
              <TypographyP>{p}</TypographyP>
            </div>
          </div>
          <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-muted mt-4">
            <Image
              src={imgUrl}
              alt={title + ' Image'}
              width={1280}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )
    }

    return (
      <section id="visi" className={STYLE_MARGIN_CONTAINER}>
        <Container className="flex flex-col items-center">
          <HeaderSection
            titleSmall={'Arah & Tujuan Kami'}
            title={'Visi yang Kami Bangun, Misi yang Kami Jalankan'}
          />
          <div className={STYLE_MARGIN_CONTAINER_TOP} />

          <div className="flex flex-col gap-20">
            <VMCard
              title="Visi Kami"
              icon={faEye}
              h3="Menjadi Pilihan Utama Perjalanan Digital"
              p="Mewujudkan perusahaan perjalanan berbasis digital yang dipercaya pelanggan melalui pelayanan profesional, inovatif, dan berkelanjutan."
              imgUrl="/assets/web/home/hero-1.jpg"
            />
            <VMCard
              title="Misi Kami"
              icon={faTasks}
              position="right"
              h3="Memberikan Layanan yang Bernilai"
              p="Menyelenggarakan layanan perjalanan yang terencana, aman, dan berorientasi pada kepuasan pelanggan, serta menciptakan nilai tambah bagi seluruh pemangku kepentingan."
              imgUrl="/assets/web/home/hero-5.webp"
            />
          </div>
        </Container>
      </section>
    )
  }
}
