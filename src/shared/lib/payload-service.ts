/**
 * Optimized Payload Service with Caching
 *
 * This service provides a centralized way to interact with Payload CMS
 * with built-in caching for improved performance.
 */

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { cacheService, CacheService } from './cache'
import type { Payload, Where, PaginatedDocs, DataFromCollectionSlug } from 'payload'
import type { GlobalSetting } from '@/payload-types'

// Collection slugs from the project
export type CollectionSlug =
  | 'users'
  | 'media'
  | 'tours'
  | 'testimonials'
  | 'payload-kv'
  | 'payload-locked-documents'
  | 'payload-preferences'
  | 'payload-migrations'
export type GlobalSlug = 'global-settings'

class OptimizedPayloadService {
  private payloadInstance: Payload | null = null
  private payloadPromise: Promise<Payload> | null = null

  /**
   * Get Payload instance with singleton pattern
   */
  async getPayload(): Promise<Payload> {
    if (this.payloadInstance) {
      return this.payloadInstance
    }

    if (!this.payloadPromise) {
      this.payloadPromise = getPayloadHMR({ config: configPromise }).then((payload) => {
        this.payloadInstance = payload
        return payload
      })
    }

    return this.payloadPromise
  }

  /**
   * Find documents with caching
   */
  async find<T = unknown>(
    collection: CollectionSlug,
    options: {
      select?: Record<string, boolean>
      where?: Where
      sort?: string
      limit?: number
      depth?: number
      draft?: boolean
      cache?: boolean
      cacheTTL?: number
      cacheKey?: string
    } = {},
  ): Promise<{ docs: T[]; totalDocs: number }> {
    const {
      select,
      where,
      sort,
      limit,
      depth = 1,
      draft = false,
      cache = true,
      cacheTTL = 60000, // 1 minute default for real-time
      cacheKey: customCacheKey,
    } = options

    const cacheKey =
      customCacheKey ||
      CacheService.getCollectionKey(collection, 'find', {
        select,
        where,
        sort,
        limit,
        depth,
      })

    const fetcher = async (): Promise<{ docs: T[]; totalDocs: number }> => {
      const payload = await this.getPayload()
      const result = (await payload.find({
        collection,
        select,
        where,
        sort,
        limit,
        depth,
        draft,
      })) as PaginatedDocs<DataFromCollectionSlug<CollectionSlug>>
      return result as unknown as { docs: T[]; totalDocs: number }
    }

    if (cache) {
      return cacheService.get(cacheKey, fetcher, { ttl: cacheTTL })
    }

    return fetcher()
  }

  /**
   * Find document by ID with caching
   */
  async findByID<T = unknown>(
    collection: CollectionSlug,
    id: string,
    options: {
      depth?: number
      draft?: boolean
      cache?: boolean
      cacheTTL?: number
    } = {},
  ): Promise<T | null> {
    const { depth = 2, draft = false, cache = true, cacheTTL = 60000 } = options

    const cacheKey = CacheService.getCollectionKey(collection, 'findByID', { id, depth })

    const fetcher = async (): Promise<T | null> => {
      const payload = await this.getPayload()
      try {
        const result = (await payload.findByID({
          collection,
          id,
          depth,
          draft,
        })) as DataFromCollectionSlug<CollectionSlug>
        return result as unknown as T
      } catch {
        return null
      }
    }

    if (cache) {
      return cacheService.get(cacheKey, fetcher, { ttl: cacheTTL })
    }

    return fetcher()
  }

  /**
   * Find global with caching
   */
  async findGlobal<T = unknown>(
    slug: GlobalSlug,
    options: {
      depth?: number
      draft?: boolean
      cache?: boolean
      cacheTTL?: number
    } = {},
  ): Promise<T | null> {
    const { depth = 2, draft = false, cache = true, cacheTTL = 300000 } = options // 5 minutes for globals

    const cacheKey = CacheService.getGlobalKey(slug)

    const fetcher = async (): Promise<T | null> => {
      const payload = await this.getPayload()
      try {
        const result = (await payload.findGlobal({
          slug,
          depth,
          draft,
        })) as GlobalSetting
        return result as unknown as T
      } catch {
        return null
      }
    }

    if (cache) {
      return cacheService.get(cacheKey, fetcher, { ttl: cacheTTL })
    }

    return fetcher()
  }

  /**
   * Invalidate cache for a collection
   */
  invalidateCollection(collection: string): void {
    cacheService.invalidatePattern(`collection:${collection}:`)
  }

  /**
   * Invalidate cache for a global
   */
  invalidateGlobal(slug: string): void {
    cacheService.invalidate(CacheService.getGlobalKey(slug))
  }

  /**
   * Invalidate all cache
   */
  invalidateAll(): void {
    cacheService.invalidateAll()
  }
}

// Export singleton instance
export const payloadService = new OptimizedPayloadService()

// Export for testing
export { OptimizedPayloadService }
