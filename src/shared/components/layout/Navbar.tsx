import React from 'react'
import CardNav, { CardNavLink } from '../provider/CardNav'
import { SettingsService } from '@/features/settings/services/settings.service'

export const Navbar = async () => {
  const items: CardNavLink[] = [
    { label: 'Halaman Utama', href: '/', ariaLabel: 'Landing Page' },
    { label: 'Tours', href: '/tours', ariaLabel: 'Tour Page' },
    { label: 'Tentang Kami', href: '/about', ariaLabel: 'Tentang Kami Page' },
    { label: 'Layanan Kami', href: '/#service', ariaLabel: 'Our Services' },
    { label: 'Testimonials', href: '/#testimonial', ariaLabel: 'Testimony Clients' },
  ]

  // Fetch settings from CMS
  const settings = await SettingsService.getPublicSettings()

  // Use logo from CMS or fallback to hardcoded path
  // Media has sizes: thumbnail, card, hero
  const logoPath = settings.logoNavbar?.url || '/brand/logo/h-1.webp'

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <CardNav
        logo={logoPath}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
      />
    </header>
  )
}
