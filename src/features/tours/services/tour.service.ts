import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from '@payload-config';
import { Tour, TourSummary } from "../types";

export class TourService {
  private static async getPayload() {
    return getPayloadHMR({ config: configPromise })
  }

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
