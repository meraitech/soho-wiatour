// src/app/(frontend)/tours/[slugName]/TourSchema.tsx
import type { Tour } from '@/features/tours/types'

export default function TourSchema({ tour }: { tour: Tour }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name: tour.title,
    description: tour.description,
    image: tour.heroImage.url,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
