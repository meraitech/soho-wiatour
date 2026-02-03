import type { MetadataRoute } from 'next'

const SITE_URL = 'https://wiatour.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const hasDatabase = !!process.env.DATABASE_URL

  if (hasDatabase) {
    try {
      const { TourService } = await import('@/features/tours/services')
      const tours = await TourService.getAll()

      return [
        {
          url: SITE_URL,
          lastModified: new Date(),
        },
        {
          url: `${SITE_URL}/tours`,
          lastModified: new Date(),
        },
        ...tours.map((tour) => ({
          url: `${SITE_URL}/tours/${tour.slug}`,
          lastModified: new Date(tour.createdAt),
        })),
      ]
    } catch {
      return getBasicSitemap()
    }
  }

  return getBasicSitemap()
}

function getBasicSitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/tours`,
      lastModified: new Date(),
    },
  ]
}
