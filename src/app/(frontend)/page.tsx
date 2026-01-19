import React from 'react'
import { HeroSection } from './_components/HeroSection'
import { AboutSection } from './_components/AboutSection'
import { OurServiceSection } from './_components/OurServiceSection'

export default function page() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <OurServiceSection />
    </div>
  )
}
