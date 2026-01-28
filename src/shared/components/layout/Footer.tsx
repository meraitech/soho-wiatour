import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faTiktok } from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import { Container } from '../provider/Container'
import CTASection from '../CTASection'
import id from '@/shared/assets/jsons/id.json'

export const Footer = () => {
  const text = id.landing

  return (
    <footer className="w-full min-h-300 overflow-hidden relative flex rounded-t-3xl border-t border-border">
      {/* <div className="absolute top-0 left-0 w-full h-20 z-2 bg-linear-to-b from-background" /> */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-2 bg-linear-to-t from-foreground/50" />
      <div className="absolute left-0 top-0 w-full h-full z-1">
        <img
          src="/images/footer.webp"
          alt=""
          className="object-[50%_80%] w-full h-full object-cover"
        />
      </div>
      <Container className="z-3 w-full">
        <section className="h-full flex flex-col justify-between gap-12">
          <div className="h-full flex items-center justify-center">
            <CTASection
              item={{
                quote: text.cta.quote,
                button1: text.cta.button1,
                button2: text.cta.button2,
              }}
            />
          </div>
          <div className="flex justify-between text-background">
            <div className="flex flex-col justify-between gap-20">
              <div>
                <img src="/brand/logo/hw-1.webp" alt="" className="h-10 object-contain" />
              </div>
              <span>
                &copy; 2026 Wiatour. All rights reserved.{' '}
                <span className="opacity-50">Made by Merai</span>
              </span>
            </div>

            <div className="flex flex-col">
              <div className="flex gap-6 h-full">
                <FontAwesomeIcon icon={faInstagram} className="w-8 h-8" />
                <FontAwesomeIcon icon={faTiktok} className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>
      </Container>
    </footer>
  )
}
