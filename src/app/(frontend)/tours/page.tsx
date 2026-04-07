import { TypographyH1 } from '@/shared/components/ui/TypographyH1'
import { Container } from '@/shared/components/provider/Container'
import {
  STYLE_MARGIN_CONTAINER,
  STYLE_MARGIN_CONTAINER_BOTTOM,
} from '@/shared/constants/style/margin'
import { Button } from '@/shared/components/ui/Button'
import { TourCard } from '@/features/tours/components/ui/TourCard'
import { OptimizedTourService } from '@/features/tours/services'
import { TourSummary } from '@/features/tours/types'
import { whatsappApiLink } from '@/shared/utils/whatsappHandler'

/* ======================================================
   PAGE — Tours Page
====================================================== */

// Force dynamic rendering for real-time data updates
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  const tours = await OptimizedTourService.getAll()
  return (
    <div id="tour-highlight" className="overflow-hidden">
      {/* ======================================================
         SECTION HERO 
      ====================================================== */}
      <HeroSection />

      {/* ======================================================
         SECTION ALL TOURS 
      ====================================================== */}
      <AllToursSection tours={tours} />
    </div>
  )

  /* =========================
     UI
  ========================= */
  /* ======================================================
   SECTION HERO
  ====================================================== */
  function HeroSection() {
    const href = whatsappApiLink({
      text: encodeURIComponent(
        `Halo,Saya menghubungi Anda melalui website wiatour.com. Saya tertarik untuk mendapatkan informasi lebih detail mengenai paket tour yang tersedia. Terima kasih.`,
      ),
    })

    return (
      <section className={STYLE_MARGIN_CONTAINER}>
        <Container>
          <div className="md:max-w-3xl max-w-2xl mx-auto text-center flex flex-col md:gap-8 gap-4 items-center mt-8">
            <span>Paket Perjalanan</span>
            <TypographyH1>Temukan Perjalanan yang Tepat untuk Anda</TypographyH1>

            {/* button  */}
            <div className="flex gap-4 mt-6">
              <Button href="/tours#all_tour">Lihat Semua Tour</Button>
              <Button variant="monocrome_black" href={href}>
                Hubungi Kami
              </Button>
            </div>
          </div>
        </Container>
      </section>
    )
  }

  /* ======================================================
   SECTION ALL TOURS
  ====================================================== */
  function AllToursSection({ tours }: { tours: TourSummary[] }) {
    return (
      <section id="all_tour" className={STYLE_MARGIN_CONTAINER_BOTTOM}>
        <h2 className="sr-only">All Tours</h2>
        <Container className="grid md:grid-cols-3 grid-cols-2 gap-6">
          {tours.map((item, index) => (
            <TourCard
              key={'tour:' + index}
              slug={item.slug}
              imgUrl={item.thumbnail.url!}
              title={item.title}
              imgAlt={item.thumbnail.alt}
            />
          ))}
        </Container>
      </section>
    )
  }
}
