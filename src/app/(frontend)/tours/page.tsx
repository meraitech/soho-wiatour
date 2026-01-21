import React from 'react'
import id from '@/shared/assets/jsons/id.json'
import CTASection from '@/shared/components/CTASection'

/* ======================================================
   PAGE — Tours Page
====================================================== */

export default function page() {
  return (
    <div>
      <CTASection
        item={{
          quote: id.landing.cta.quote,
          button1: id.landing.cta.button1,
          button2: id.landing.cta.button2,
        }}
      />
    </div>
  )
}
