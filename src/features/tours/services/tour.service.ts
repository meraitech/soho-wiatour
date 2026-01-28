import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from '@payload-config';
import { Tour, TourSummary } from "../types";

export class TourService {
  private static async getPayload() {
    return getPayloadHMR({ config: configPromise })
  }

  /**
   * Get all published tours with summary data
   * @returns Array of tour summaries (id, title, slug, thumbnail, description, status, createdAt)
   * @example
   * const tours = await TourService.getAll()
   * // Returns: [{ id: '1', title: 'Bali Tour', slug: 'bali-tour', ... }]
   */
  static async getAll(): Promise<TourSummary[]> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'tours',
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
        status: { equals: 'published' }
      },
    })

    return result.docs as TourSummary[]
  }

  /**
   * Get a single published tour by its slug
   * @param slug - The tour slug (e.g., 'bali-tour')
   * @returns Tour object with full details or null if not found
   * @example
   * const tour = await TourService.getBySlug('bali-tour')
   * // Returns: { id: '1', title: 'Bali Tour', thumbnail: Media, ... }
   */
  static async getBySlug(slug: string): Promise<Tour | null> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'tours',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' }
      },
      depth: 2,
      limit: 1,
    })

    if (result.docs.length === 0) return null

    return result.docs[0] as Tour
  }


  /**
   * Get a tour by its ID (including drafts)
   * @param id - The tour ID
   * @returns Tour object with full details or null if not found
   * @example
   * const tour = await TourService.getById('abc123')
   * // Returns: { id: 'abc123', title: 'Bali Tour', ... }
   */
  static async getById(id: string): Promise<Tour | null> {
    const payload = await this.getPayload()

    try {
      const tour = await payload.findByID({
        collection: 'tours',
        id,
        depth: 2
      })

      return tour as Tour
    } catch {
      return null
    }
  }

  /**
   * Get related tours based on current tour's relatedTours or latest published tours
   * @param currentTourId - The current tour ID to exclude
   * @param limit - Maximum number of related tours to return (default: 6)
   * @returns Array of related tour objects
   * @example
   * const related = await TourService.getRelated('tour123', 4)
   * // Returns: [{ id: 'tour456', title: 'Lombok Tour', ... }, ...]
   */
  static async getRelated(currentTourId: string, limit: 6): Promise<Tour[]> {
    const payload = await this.getPayload()

    const currentTour = await this.getById(currentTourId)

    if (currentTour?.relatedTours && currentTour.relatedTours.length > 0) {
      return currentTour.relatedTours.slice(0, limit) as Tour[]
    }

    const result = await payload.find({
      collection: 'tours',
      where: {
        status: { equals: 'published' },
        id: { not_equals: currentTourId },
      },
      sort: '-createdAt',
      limit,
      depth: 1,
    })

    return result.docs as Tour[]
  }

  /**
   * Get total count of published tours
   * @returns Total number of published tours
   * @example
   * const count = await TourService.getCount()
   * // Returns: 15
   */
  static async getCount(): Promise<number> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'tours',
      where: {
        status: { equals: 'published' },
      },
      limit: 0,
    })

    return result.totalDocs
  }
}
