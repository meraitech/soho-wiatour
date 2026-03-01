import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { TypographyH2 } from '@/shared/components/ui/TypographyH2'
import { TypographyP } from '@/shared/components/ui/TypographyP'
import { Container } from '@/shared/components/provider/Container'
import { Button } from '@/shared/components/ui/Button'
import {
  STYLE_MARGIN_CONTAINER_BOTTOM,
  STYLE_MARGIN_CONTAINER_TOP,
} from '@/shared/constants/style/margin'
import { HeaderSection } from '@/shared/components/HeaderSection'
import { TourHighlight } from '@/features/tours/components/TourHighlight'
import { VelocityScroller } from '@/shared/components/ScrollVelocity'
import { TestimonialCard } from '@/features/company/components/TestimonialCard'
import { OurServiceSection } from '@/features/company/components/OurServiceSection'
import { HomeHeroVideo } from '@/features/company/components/HomeHeroVideo'
import { TestimonialService } from '@/features/testimonials/services'
import id from '@/shared/assets/jsons/id.json'
import { BaseImage } from '@/shared/components/ui/BaseImage'
import { resolveMediaUrl } from '@/shared/utils/resolveMediaUrl'

type HomeTestimonial = {
  id: string
  quotes: string
  name: string
  imgUrl: string | null
}

export default async function Page() {
  const text = id.landing
  const testimonials = await getTestimonials()

  return (
    <div className="overflow-x-hidden">
      <HeroSection text={text.hero} />
      <AboutSection text={text.about} />
      <OurServiceSection />
      <TourHighlight currentTourId="" />
      <TestimonialSection text={text.testimonial} testimonials={testimonials} />
    </div>
  )
}

async function getTestimonials(): Promise<HomeTestimonial[]> {
  try {
    const cmsTestimonials = await TestimonialService.getPublished(10)

    return cmsTestimonials.map((item) => ({
      id: item.id,
      quotes: item.quotes,
      name: item.name,
      imgUrl: resolveMediaUrl(item.image?.url) || null,
    }))
  } catch {
    return []
  }
}

function HeroSection({
  text,
}: {
  text: {
    title: string
    ctaPrimary: string
    ctaSecondary: string
  }
}) {
  return (
    <section>
      <Container className="flex flex-col">
        <div className="h-[70dvh] flex flex-col items-center mx-auto justify-center lg:gap-12 md:gap-8 gap-6 xl:max-w-5xl lg:max-w-4xl md:max-w-3xl sm:max-w-2xl">
          <TypographyH1 className="text-center">{text.title}</TypographyH1>

          <div className="flex md:gap-6 gap-4">
            <Button href="#tour-highlight" size="lg">
              {text.ctaPrimary}
            </Button>
            <Button href="#cta" variant="monocrome_black" size="lg">
              {text.ctaSecondary}
            </Button>
          </div>
        </div>

        <HomeHeroVideo />
      </Container>
    </section>
  )
}

function AboutSection({
  text,
}: {
  text: {
    titleSmall: string
    title: string
    description: string
    cta: string
  }
}) {
  return (
    <section id="about" className={STYLE_MARGIN_CONTAINER_BOTTOM}>
      <div className={STYLE_MARGIN_CONTAINER_TOP}></div>
      <Container className={'grid md:grid-cols-2 gap-8'}>
        <div className="flex flex-col justify-center items-start gap-14 md:max-w-125">
          <div className="flex flex-col gap-6 items-start">
            <span className="md:text-lg">{text.titleSmall}</span>
            <TypographyH2 className="mt-2">{text.title}</TypographyH2>
            <TypographyP>{text.description}</TypographyP>
          </div>
          <Button variant="monocrome_black" href="/about">
            {text.cta}
          </Button>
        </div>

        <div className="rounded-2xl relative overflow-hidden md:aspect-6/7 aspect-4/3">
          <BaseImage
            src="/assets/web/home/about.jpg"
            alt="Foto Tim Wiatour"
            className="object-cover w-full h-full"
            fill
          />
        </div>
      </Container>
    </section>
  )
}

function TestimonialSection({
  text,
  testimonials,
}: {
  text: {
    header: {
      titleSmall: string
      title: string
    }
  }
  testimonials: HomeTestimonial[]
}) {
  return (
    <section id="testimonial" className={STYLE_MARGIN_CONTAINER_BOTTOM}>
      <Container className="flex flex-col items-center relative overflow-hidden">
        <HeaderSection titleSmall={text.header.titleSmall} title={text.header.title} />
        <div className={STYLE_MARGIN_CONTAINER_TOP} />

        {testimonials.length > 0 ? (
          <div className="flex flex-col gap-6 relative w-full">
            <div className="bg-linear-to-r from-background lg:w-20 md:w-14 w-7 h-full absolute left-0 top-0 z-5" />

            <VelocityScroller baseVelocity={80} numCopies={3} trackClassName="gap-6">
              <div className="flex gap-6">
                {testimonials.map((item) => (
                  <TestimonialCard key={`row1-${item.id}`} item={item} />
                ))}
              </div>
            </VelocityScroller>

            <VelocityScroller baseVelocity={-80} numCopies={3} trackClassName="gap-6">
              <div className="flex gap-6">
                {testimonials.map((item) => (
                  <TestimonialCard key={`row2-${item.id}`} item={item} />
                ))}
              </div>
            </VelocityScroller>

            <div className="bg-linear-to-l from-background lg:w-20 md:w-14 w-7 h-full absolute right-0 top-0 z-5" />
          </div>
        ) : (
          <p className="text-paragraph">Belum ada testimonial yang dipublish.</p>
        )}
      </Container>
    </section>
  )
}
