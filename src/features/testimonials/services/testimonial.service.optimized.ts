/**
 * Optimized Testimonial Service with Caching
 *
 * This service provides optimized data fetching for testimonials with:
 * - Built-in caching for better performance
 * - Real-time data support (short cache TTL)
 * - Deduplicated requests
 */

import { payloadService } from '@/shared/lib/payload-service'
import { Testimonial, TestimonialSummary } from '../types'

export class OptimizedTestimonialService {
  /**
   * Get all published testimonials with summary data (sorted by latest)
   * Uses 30 second cache for near real-time updates
   */
  static async getAll(): Promise<TestimonialSummary[]> {
    const result = await payloadService.find<TestimonialSummary>('testimonials', {
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
      cache: true,
      cacheTTL: 30000, // 30 seconds
    })

    return result.docs
  }

  /**
   * Get published testimonials with full data
   * Uses 30 second cache
   */
  static async getPublished(limit?: number): Promise<Testimonial[]> {
    const result = await payloadService.find<Testimonial>('testimonials', {
      where: {
        status: { equals: 'published' },
      },
      sort: '-createdAt',
      limit: limit || 10,
      depth: 1,
      cache: true,
      cacheTTL: 30000,
    })

    return result.docs
  }

  /**
   * Get a testimonial by its ID (including drafts)
   */
  static async getById(id: string): Promise<Testimonial | null> {
    return payloadService.findByID<Testimonial>('testimonials', id, {
      depth: 1,
      cache: true,
      cacheTTL: 30000,
    })
  }

  /**
   * Get total count of published testimonials
   */
  static async getCount(): Promise<number> {
    const result = await payloadService.find('testimonials', {
      where: {
        status: { equals: 'published' },
      },
      limit: 0,
      cache: true,
      cacheTTL: 60000, // 1 minute
    })

    return result.totalDocs
  }

  /**
   * Invalidate testimonial cache - call this when testimonials are modified
   */
  static invalidateCache(): void {
    payloadService.invalidateCollection('testimonials')
  }
}
