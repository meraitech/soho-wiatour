import React from 'react'
import { Button } from '../ui/Button'
import Link from 'next/link'

export const Navbar = () => {
  const listNav = [
    {
      url: '/tours',
      label: 'Tours',
    },
    {
      url: '/about',
      label: 'About',
    },
    {
      url: '/service',
      label: 'Services',
    },
  ]
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-center p-4">
      <div className="relative border border-foreground/20 bg-background backdrop-blur-xs rounded-full p-3 flex items-center gap-28">
        <nav className="w-60">
          <ul className="flex gap-4 px-3">
            {listNav.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="text-paragraph hover:text-foreground hover:font-medium duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <img src="/brand/logo/hb-1.webp" alt="" className="h-7" />

        <div className="w-60 flex justify-end">
          <Button>Hubungi Kami</Button>
        </div>
      </div>
    </header>
  )
}
