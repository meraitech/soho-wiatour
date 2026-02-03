import React from 'react'
import CardNav, { CardNavLink } from '../provider/CardNav'

export const Navbar = () => {
  const items: CardNavLink[] = [
    { label: 'Halaman Utama', href: '/', ariaLabel: 'Landing Page' },
    { label: 'Tours', href: '/tours', ariaLabel: 'Tour Page' },
    { label: 'Tentang Kami', href: '/about', ariaLabel: 'Tentang Kami Page' },
    { label: 'Layanan Kami', href: '/#services', ariaLabel: 'Our Services' },
    { label: 'Testimonials', href: '/#testimonial', ariaLabel: 'Testimony Clients' },
  ]
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <CardNav
        logo={'/brand/logo/h-1.webp'}
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
