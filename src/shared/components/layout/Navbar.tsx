import React from 'react'
import CardNav, { CardNavLink } from '../provider/CardNav'
// import { SettingsService } from '@/features/settings/services/settings.service'
import { whatsappApiLink } from '@/shared/utils/whatsappHandler'

export const Navbar = async () => {
  const items: CardNavLink[] = [
    { label: 'Halaman Utama', href: '/', ariaLabel: 'Landing Page' },
    { label: 'Tours', href: '/tours', ariaLabel: 'Tour Page' },
    { label: 'Tentang Kami', href: '/about', ariaLabel: 'Tentang Kami Page' },
    { label: 'Layanan Kami', href: '/#services', ariaLabel: 'Our Services' },
    { label: 'Testimonials', href: '/#testimonial', ariaLabel: 'Testimony Clients' },
  ]

  // Fetch settings from CMS
  // const settings = await SettingsService.getPublicSettings()

  // Use logo from CMS or fallback to hardcoded path
  // Media has sizes: thumbnail, card, hero
  // const logoPath = settings.logoNavbar?.url || '/brand/logo/h-1.webp'
  // console.log(logoPath)
  const logoPath = '/brand/logo/h-1.webp'
  const text =
    'Halo,%20selamat%20siang.%0ASaya%20menghubungi%20Anda%20melalui%20website%20wiatour.com.%0ASaya%20tertarik%20untuk%20mendapatkan%20informasi%20lebih%20detail%20mengenai%20paket%20tour%20yang%20tersedia.%0ATerima%20kasih.'

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <CardNav
        logo={logoPath}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        ease="power3.out"
        actionHref={whatsappApiLink({ text })}
      />
    </header>
  )
}
