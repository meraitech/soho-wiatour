import { HeaderSection } from '@/shared/components/HeaderSection'
import { Container } from '@/shared/components/ui/Container'
import { TitleSmallWithIcon } from '@/shared/components/ui/TitleSmallWithIcon'
import { TypographyH3 } from '@/shared/components/ui/TypographyH3'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { MARGIN_CONTAINER } from '@/shared/constants/style/margin'
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'
import React from 'react'

const ourServices = [
  {
    title_small: 'Ready Made Tour',
    title: 'Perjalanan Praktis, Tanpa Repot',
    paragraph:
      'Paket tour siap jalan dengan itinerary yang telah dirancang secara matang. Cocok untuk Anda yang menginginkan perjalanan nyaman tanpa perlu menyusun rencana dari awal.',
  },
  {
    title_small: 'Tailor Made Tour',
    title: 'Dirancang Sesuai Keinginan Anda',
    paragraph:
      'Perjalanan yang disesuaikan dengan kebutuhan, preferensi, dan tujuan Anda. Setiap detail dirancang bersama tim kami untuk menciptakan pengalaman yang lebih personal.',
  },
  {
    title_small: 'Private & Open Trip',
    title: 'Fleksibel untuk Setiap Perjalanan',
    paragraph:
      'Pilih perjalanan privat bersama grup Anda atau bergabung dalam open trip. Keduanya dirancang dengan standar kenyamanan dan pelayanan yang sama.',
  },
]

export const OurServiceSection = () => {
  return (
    <section className={MARGIN_CONTAINER}>
      <Container className="flex flex-col items-center gap-12">
        <HeaderSection />
        {ourServices.map((item, index) => (
          <ServiceComponent
            key={index}
            title_small={item.title_small}
            title={item.title}
            paragraph={item.paragraph}
          />
        ))}
      </Container>
    </section>
  )
}

const ServiceComponent = ({
  title_small,
  title,
  paragraph,
}: {
  title_small: string
  title: string
  paragraph: string
}) => {
  return (
    <div className="w-full grid md:grid-cols-2 gap-8">
      {/* left  */}
      <div className="bg-muted border max-w-120">
        <img
          src="/brand/logo-mark.svg"
          alt=""
          className="object-cover md:aspect-square aspect-4/3 duration-300"
        />
      </div>

      {/* right  */}
      <section className="flex items-center justify-end ">
        <div className="flex flex-col w-full max-w-100 gap-4">
          <TitleSmallWithIcon text={title_small} icon={faWandMagicSparkles} />

          <TypographyH3 className="mb-2">{title}</TypographyH3>
          <TypographyP>{paragraph}</TypographyP>
        </div>
      </section>
    </div>
  )
}
