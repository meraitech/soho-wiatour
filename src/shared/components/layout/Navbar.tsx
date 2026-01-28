import React from 'react'
import { Button } from '../ui/Button'
import Link from 'next/link'
import CardNav, { CardNavItem } from '../provider/CardNav'

export const Navbar = () => {
  const items: CardNavItem[] = [
    {
      label: 'Home',
      bgColor: '#0D0716',
      textColor: '#fff',
      links: [
        { label: 'Landing Page', href: '/', ariaLabel: 'Landing Page' },
        { label: 'Services', href: '/service', ariaLabel: 'Our Services' },
        { label: 'Testimonials', href: '/testimonial', ariaLabel: 'Testimony Clients' },
      ],
    },
    {
      label: 'About',
      bgColor: '#0D0716',
      textColor: '#fff',
      links: [
        { label: 'Company', href: '/about', ariaLabel: 'About Company' },
        { label: 'Careers', href: '/about', ariaLabel: 'About Careers' },
      ],
    },
    {
      label: 'Tours',
      bgColor: '#0D0716',
      textColor: '#fff',
      links: [
        { label: 'Tours', href: '/tours', ariaLabel: 'All Tours' },
        { label: 'Careers', href: '/about', ariaLabel: 'About Careers' },
      ],
    },
  ]
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* <div className="relative bg-background py-3 lg:px-10 md:px-8 px-6 flex items-center justify-between lg:gap-28">
        <Link href={'/'} className="sm:w-40 shrink-0">
          <img src="/brand/logo/hb-1.webp" alt="" className="h-7 object-contain" />
        </Link>

        <nav className="max-lg:hidden">
          <ul className="flex gap-4">
            {listNav.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="text-foreground/70 hover:text-foreground duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sm:w-40 flex justify-end shrink-0">
          <Button size="sm">Hubungi Kami</Button>
        </div>
      </div> */}
      <CardNav
        logo={'/brand/logo/hb-1.webp'}
        logoAlt="Company Logo"
        items={items}
        baseColor="#fff"
        menuColor="#000"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        // theme="color"
      />
    </header>
  )
}
