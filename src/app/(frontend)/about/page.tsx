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
import id from '@/shared/assets/jsons/id.json'
import clsx from 'clsx'

export default function Page() {
  const text = id.about

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
        <Container className="flex flex-col lg:gap-20 gap-14">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-8 items-center mt-8">
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
              <TypographyH2 className="mb-4">{text.about.title}</TypographyH2>
              {text.about.description.map((desc, item) => (
                <TypographyP key={item}>{desc}</TypographyP>
              ))}
            </div>
            <div className="ml-auto bg-accent w-full md:max-w-120 md:aspect-6/7 aspect-video relative overflow-hidden rounded-3xl">
              <Image
                src={text.about.imgUrl}
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
      <section id="ceo" className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        <Container className="flex max-lg:flex-col gap-14">
          <div className="ml-auto bg-muted w-full lg:w-110 shrink-0 aspect-square relative overflow-hidden rounded-3xl">
            <Image
              src={text.ceo.imgUrl}
              alt="Photo CEO Wiradrana Putri Harefa"
              width={1280}
              height={800}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col md:gap-14 gap-10 justify-center lg:w-6/7 duration-300">
            <h2 className="sr-only">CEO Quote</h2>
            <blockquote className="flex lg:text-3xl text-2xl">{`"${text.ceo.quotes}"`}</blockquote>
            <span className="font-medium ">
              {text.ceo.name + ' '}
              <span className="text-paragraph">CEO</span>{' '}
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
        <div
          className={clsx(
            'w-full grid md:grid-cols-2 md:gap-12 gap-8 overflow-hidden',
            STYLE_MARGIN_CONTAINER_TOP,
          )}
        >
          <div className={`flex ${position == 'right' ? 'order-2' : 'max-md:order-2'}`}>
            <div
              className={`service-step flex flex-col w-full my-auto max-md:order-1 md:max-w-100 gap-4 `}
            >
              <TitleSmallWithIcon text={title} icon={icon} />

              <TypographyH3 className="mb-2">{h3}</TypographyH3>
              <TypographyP>{p}</TypographyP>
            </div>
          </div>
          <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-muted">
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
      <section id="visi">
        <Container className="flex flex-col items-center">
          <HeaderSection
            titleSmall={'Arah & Tujuan Kami'}
            title={'Visi yang Kami Bangun, Misi yang Kami Jalankan'}
          />
          <div className="flex w-full flex-col">
            <VMCard
              title={text.vission.title}
              icon={faEye}
              h3={text.vission.heading}
              p={text.vission.description}
              imgUrl={text.vission.imgUrl}
            />
            {/* <VMCard
              title={text.mission.title}
              icon={faTasks}
              position="right"
              h3={text.mission.heading}
              p={text.mission.description}
              imgUrl={text.mission.imgUrl}
            /> */}
            <div
              className={clsx(
                'w-full grid md:grid-cols-2 md:gap-12 gap-8 overflow-hidden',
                STYLE_MARGIN_CONTAINER_TOP,
              )}
            >
              <div className={`flex order-2`}>
                <div className={`service-step flex flex-col w-full my-auto max-md:order-1 gap-4 `}>
                  <TitleSmallWithIcon text={text.mission.title} icon={faTasks} />

                  <TypographyH3 className="mb-2">{text.mission.heading}</TypographyH3>
                  <ol className="flex flex-col gap-4">
                    {text.mission.description.map((text, index) => (
                      <li key={index}>
                        <TypographyP>{text}</TypographyP>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <div className="w-full aspect-4/3 rounded-2xl overflow-hidden bg-muted">
                <Image
                  src={text.mission.imgUrl}
                  alt={text.mission.title + ' Image'}
                  width={1280}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    )
  }
}
