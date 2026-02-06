import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faWhatsapp,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { Container } from '../provider/Container'
import CTASection from '../CTASection'
import id from '@/shared/assets/jsons/id.json'
import { STYLE_MARGIN_CONTAINER_BOTTOM } from '@/shared/constants/style/margin'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import { SettingsService } from '@/features/settings/services/settings.service'
import Image from 'next/image'
import { whatsappApiLink } from '@/shared/utils/whatsappHandler'

export const Footer = async () => {
  const text = id.landing

  // Fetch settings from CMS
  const settings = await SettingsService.getPublicSettings()

  // Use logo from CMS or fallback to hardcoded path
  const logoPath = '/brand/logo/h-2.webp'
  // const logoPath = settings.logoFooter?.url || '/brand/logo/h-2.webp'

  // Use CTA quote from CMS or fallback to static data
  const ctaQuote = settings.ctaQuote || text.cta.quote

  // Map social media platform names to FontAwesome icons
  const getSocialIcon = (platform: string) => {
    const iconMap: Record<string, any> = {
      instagram: faInstagram,
      facebook: faFacebook,
      tiktok: faTiktok,
      whatsapp: faWhatsapp,
      twitter: faXTwitter,
      x: faXTwitter,
    }
    return iconMap[platform.toLowerCase()] || null
  }

  // Use social media from CMS or fallback to hardcoded list
  const listSocials =
    settings.socialMedia && settings.socialMedia.length > 0
      ? settings.socialMedia
          .map((sm) => ({
            icon: getSocialIcon(sm.platform),
            label: sm.platform,
            url: sm.url,
          }))
          .filter((item) => item.icon !== null)
      : [
          {
            icon: faFacebook,
            label: 'Facebook',
            url: 'https://www.facebook.com/p/WIA-Tour-Travel-61563058003151/',
          },
          {
            icon: faInstagram,
            label: 'Instagram',
            url: 'https://www.instagram.com/wiatourtravel.id/',
          },
          {
            icon: faWhatsapp,
            label: 'Whatsapp',
            url: '/',
          },
        ]

  const listHome = [
    {
      label: 'Ringkasan Wiatour',
      url: '/#about',
    },
    {
      label: 'Layanan',
      url: '/#services',
    },
    {
      label: 'Semua Tour',
      url: '/tours',
    },
    {
      label: 'Testimoni',
      url: '/#testimonial',
    },
  ]

  const listAboutPage = [
    {
      label: 'Tentang Kami',
      url: '/about',
    },
    {
      label: 'Kata CEO',
      url: '/about/#ceo',
    },
    {
      label: 'Visi & Misi',
      url: '/about/#visi',
    },
  ]

  const cta = {
    button1: {
      label: text.cta.button1,
      href: '#tour-highlight',
    },
    button2: {
      label: text.cta.button2,
      href: whatsappApiLink({
        text: 'Halo,%20selamat%20siang.%0ASaya%20menghubungi%20Anda%20melalui%20website%20wiatour.com.%0ASaya%20tertarik%20untuk%20mendapatkan%20informasi%20lebih%20detail%20mengenai%20paket%20tour%20yang%20tersedia.%0ATerima%20kasih.',
      }),
    },
  }

  return (
    <footer className="w-full overflow-hidden relative flex">
      <div className="absolute top-0 left-0 w-full h-8 z-2 bg-background rounded-b-3xl" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-2 bg-linear-to-t from-secondary/80" />
      <div className="absolute left-0 top-0 w-full h-full z-1">
        <Image
          src="/brand/patern/2.svg"
          alt="Footer Image"
          width={1280}
          height={800}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="z-3 w-full">
        <section className="h-full flex flex-col justify-between pt-8">
          <Container className="h-full flex items-center justify-center">
            <CTASection quote={ctaQuote} button1={cta.button1} button2={cta.button2} />
          </Container>
          <h2 className="sr-only">Footer Navigations</h2>

          <div className="md:p-8 p-6 bg-secondary w-full flex flex-col text-background border-t border-border">
            {/* top  */}
            <div
              className={
                'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ' +
                STYLE_MARGIN_CONTAINER_BOTTOM
              }
            >
              <div className="lg:col-span-2 max-md:col-span-2 md:row-span-2">
                <img src={logoPath} alt="Wiatour Logo" className="h-12" />
              </div>
              <section className="text-background/60 flex flex-col gap-2">
                <h3 className="text-background font-medium mb-2">Home</h3>
                {listHome.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="flex items-center gap-1.5 capitalize hover:underline"
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </section>
              <section className="text-background/60 flex flex-col gap-2">
                <h3 className="text-background font-medium mb-2">About</h3>
                {listAboutPage.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="flex items-center gap-1.5 capitalize hover:underline"
                  >
                    <span>{item.label}</span>
                  </Link>
                ))}
              </section>
              <section className="flex flex-col gap-2">
                <h3 className="text-background font-medium mb-2">Connect</h3>
                {listSocials.map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    className="flex items-center gap-1.5 capitalize hover:underline text-background/60 hover:text-background/90 duration-300"
                  >
                    <FontAwesomeIcon icon={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </section>
            </div>

            {/* bottom  */}
            <div className="flex items-center justify-between w-full text-sm">
              <span className="text-background/60">
                &copy; 2026 Wiatour. All rights reserved.{' '}
                <span className="opacity-50">Made by Merai</span>
              </span>

              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1 text-xl text-accent">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <span className="text-base">wiatour@gmail.com</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
