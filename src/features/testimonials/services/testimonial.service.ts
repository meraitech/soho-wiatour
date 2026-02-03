import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { Testimonial, TestimonialSummary } from '../types'

export class TestimonialService {
  private static async getPayload() {
    return getPayloadHMR({ config: configPromise })
  }

  /**
   * Get all published testimonials with summary data (sorted by latest)
   * @returns Array of testimonial summaries (id, name, quotes, image, status, createdAt)
   * @example
   * const testimonials = await TestimonialService.getAll()
   * // Returns: [{ id: '1', name: 'John Doe', quotes: 'Great tour!', ... }]
   */
  static async getAll(): Promise<TestimonialSummary[]> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'testimonials',
      select: {
        id: true,
        name: true,
        quotes: true,
        image: true,
        status: true,
        createdAt: true,
      },
      where: {
        status: { equals: 'published' },
      },
      sort: '-createdAt',
    })

    return result.docs as unknown as TestimonialSummary[]
  }

  /**
   * Get published testimonials with full data
   * @param limit - Maximum number of testimonials to return (default: 10)
   * @returns Array of testimonial objects with full details
   * @example
   * const testimonials = await TestimonialService.getPublished(5)
   * // Returns: [{ id: '1', name: 'John Doe', quotes: 'Great tour!', image: Media, ... }, ...]
   */
  static async getPublished(limit?: number): Promise<Testimonial[]> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'testimonials',
      where: {
        status: { equals: 'published' },
      },
      sort: '-createdAt',
      limit: limit || 10,
      depth: 1,
    })

    return result.docs as unknown as Testimonial[]
  }

  /**
   * Get a testimonial by its ID (including drafts)
   * @param id - The testimonial ID
   * @returns Testimonial object with full details or null if not found
   * @example
   * const testimonial = await TestimonialService.getById('abc123')
   * // Returns: { id: 'abc123', name: 'John Doe', quotes: 'Great tour!', ... }
   */
  static async getById(id: string): Promise<Testimonial | null> {
    const payload = await this.getPayload()

    try {
      const testimonial = await payload.findByID({
        collection: 'testimonials',
        id,
        depth: 1,
      })

      return testimonial as unknown as Testimonial
    } catch {
      return null
    }
  }

  /**
   * Get total count of published testimonials
   * @returns Total number of published testimonials
   * @example
   * const count = await TestimonialService.getCount()
   * // Returns: 25
   */
  static async getCount(): Promise<number> {
    const payload = await this.getPayload()

    const result = await payload.find({
      collection: 'testimonials',
      where: {
        status: { equals: 'published' },
      },
      limit: 0,
    })

    return result.totalDocs
  }
}
