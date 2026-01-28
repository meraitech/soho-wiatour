import React from 'react'
import { Button } from '../ui/Button'
import Link from 'next/link'

export const Navbar = () => {
  const listNav = [
    {
      url: '/about',
      label: 'About',
    },
    {
      url: '/tours',
      label: 'Tours',
    },
    {
      url: '/service',
      label: 'Services',
    },
    {
      url: '/testimonial',
      label: 'Testimonials',
    },
  ]
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="relative bg-background py-3 lg:px-10 md:px-8 px-6 flex items-center justify-between lg:gap-28">
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
      </div>
    </header>
  )
}
