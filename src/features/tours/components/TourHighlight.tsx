import { TourService } from '../services'
import { TourHighlightClient, TourHighlightItem } from './TourHighlight.client'

export const TourHighlight = async ({ currentTourId }: { currentTourId: string }) => {
  const tours = await TourService.getRelated(currentTourId, 6).catch(() => [])

  const mappedTours: TourHighlightItem[] = tours
    .map((item) => ({
      id: item?.id,
      title: item?.title,
      slug: item?.slug,
      thumbnail: {
        url: item?.thumbnail?.url || null,
        alt: item?.thumbnail?.alt || item?.title || null,
      },
    }))
    .filter((item) => Boolean(item.id && item.slug && item.title && item.thumbnail.url))
    .slice(0, 6)

  return <TourHighlightClient tours={mappedTours} />
}
