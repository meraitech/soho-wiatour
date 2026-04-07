/**
 * Optimized Tour Service with Caching
 *
 * This service provides optimized data fetching for tours with:
 * - Built-in caching for better performance
 * - Real-time data support (short cache TTL)
 * - Deduplicated requests
 */

import { payloadService } from '@/shared/lib/payload-service'
import { Tour, TourSummary } from '../types'

function extractRelatedTourIDs(relatedTours?: Tour['relatedTours']): string[] {
  if (!relatedTours?.length) return []

  return relatedTours
    .map((item) => {
      if (!item) return null
      if (typeof item === 'string') return item
      if (typeof item.id === 'string') return item.id
      return null
    })
    .filter((id): id is string => Boolean(id))
}

export class OptimizedTourService {
  /**
   * Get all published tours with summary data
   * Uses 30 second cache for near real-time updates
   */
  static async getAll(): Promise<TourSummary[]> {
    const result = await payloadService.find<TourSummary>('tours', {
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        description: true,
        status: true,
        createdAt: true,
      },
      where: {
        status: { equals: 'published' },
      },
      cache: true,
      cacheTTL: 30000, // 30 seconds for near real-time
    })

    return result.docs
  }

  /**
   * Get a single published tour by its slug
   * Uses 30 second cache
   */
  static async getBySlug(slug: string): Promise<Tour | null> {
    const result = await payloadService.find<Tour>('tours', {
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      depth: 2,
      limit: 1,
      cache: true,
      cacheTTL: 30000,
      cacheKey: `tours:slug:${slug}`,
    })

    return result.docs[0] || null
  }

  /**
   * Get a tour by its ID (including drafts)
   */
  static async getById(id: string): Promise<Tour | null> {
    return payloadService.findByID<Tour>('tours', id, {
      depth: 2,
      cache: true,
      cacheTTL: 30000,
    })
  }

  /**
   * Get related tours based on current tour's relatedTours or latest published tours
   * Uses 30 second cache
   */
  static async getRelated(currentTourId: string, limit: number = 6): Promise<Tour[]> {
    const currentTour = await this.getById(currentTourId)

    if (currentTour?.relatedTours && currentTour.relatedTours.length > 0) {
      const relatedIDs = extractRelatedTourIDs(currentTour.relatedTours).slice(0, limit)

      if (relatedIDs.length > 0) {
        const relatedResult = await payloadService.find<Tour>('tours', {
          where: {
            and: [
              { id: { in: relatedIDs } },
              { status: { equals: 'published' } },
              { id: { not_equals: currentTourId } },
            ],
          },
          depth: 1,
          limit: relatedIDs.length,
          cache: true,
          cacheTTL: 30000,
        })

        const docsByID = new Map(relatedResult.docs.map((doc) => [doc.id, doc]))
        return relatedIDs
          .map((id) => docsByID.get(id))
          .filter((tour): tour is Tour => Boolean(tour))
      }
    }

    const result = await payloadService.find<Tour>('tours', {
      where: {
        status: { equals: 'published' },
        id: { not_equals: currentTourId },
      },
      sort: '-createdAt',
      limit,
      depth: 1,
      cache: true,
      cacheTTL: 30000,
    })

    return result.docs
  }

  /**
   * Get total count of published tours
   */
  static async getCount(): Promise<number> {
    const result = await payloadService.find('tours', {
      where: {
        status: { equals: 'published' },
      },
      limit: 0,
      cache: true,
      cacheTTL: 60000, // 1 minute for counts
    })

    return result.totalDocs
  }

  /**
   * Invalidate tour cache - call this when tours are modified
   */
  static invalidateCache(): void {
    payloadService.invalidateCollection('tours')
  }
}
