import { TestimonialCard } from '@/features/company/components/TestimonialCard'
import React from 'react'
import id from '@/shared/assets/jsons/id.json'

/* ======================================================
   PAGE — Tours Page
====================================================== */

export default function page() {
  return (
    <div>
      <TestimonialCard item={id.testimonial.items[0]} />
    </div>
  )
}
