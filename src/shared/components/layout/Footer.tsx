import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTiktok, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import { Container } from '../provider/Container'
import CTASection from '../CTASection'
import id from '@/shared/assets/jsons/id.json'
import {
  STYLE_MARGIN_CONTAINER_BOTTOM,
  STYLE_MARGIN_CONTAINER_TOP,
} from '@/shared/constants/style/margin'
import { faArrowUp, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'

export const Footer = () => {
  const text = id.landing
  const listHome = [
    {
      label: 'Ringkasan Wiatour',
      url: '/',
    },
    {
      label: 'Layanan',
      url: 'url',
    },
    {
      label: 'Semua Tour',
      url: 'url',
    },
    {
      label: 'Testimoni',
      url: 'url',
    },
  ]

  const listAboutPage = [
    {
      label: 'Tentang Kami',
      url: '/about',
    },
    {
      label: 'Kata CEO',
      url: '/about',
    },
    {
      label: 'Visi & Misi',
      url: '/about',
    },
  ]

  const listSocials = [
    {
      icon: faFacebook,
      label: 'Facebook',
      url: '/',
    },
    {
      icon: faInstagram,
      label: 'Instagram',
      url: '/',
    },
    {
      icon: faWhatsapp,
      label: 'Whatsapp',
      url: '/',
    },
  ]

  return (
    <footer className="w-full overflow-hidden relative flex">
      <div className="absolute top-0 left-0 w-full h-8 z-2 bg-background rounded-b-3xl" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-2 bg-linear-to-t from-secondary/80" />
      <div className="absolute left-0 top-0 w-full h-full z-1">
        <img src="/brand/patern/2.svg" alt="Footer Image" className="w-full h-full object-cover" />
      </div>
      <div className="z-3 w-full">
        <section className="h-full flex flex-col justify-between pt-8">
          <Container className="h-full flex items-center justify-center">
            <CTASection
              item={{
                quote: text.cta.quote,
                button1: text.cta.button1,
                button2: text.cta.button2,
              }}
            />
          </Container>

          <div className="md:p-8 p-6 bg-secondary w-full flex flex-col text-background border-t border-border">
            {/* top  */}
            <div
              className={
                'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 ' +
                STYLE_MARGIN_CONTAINER_BOTTOM
              }
            >
              <div className="lg:col-span-2 max-md:col-span-2 md:row-span-2">
                <img src="/brand/logo/h-2.webp" alt="" className="h-12" />
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
