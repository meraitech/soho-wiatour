/**
 * Centralized Cache Service for CMS Data
 * Uses in-memory caching with time-based expiration
 * Provides methods for cache invalidation
 */

type CacheEntry<T> = {
  data: T
  timestamp: number
  etag?: string
}

class CacheService {
  private cache: Map<string, CacheEntry<unknown>> = new Map()
  private defaultTTL: number = 60 * 1000 // 1 minute default TTL for real-time updates
  private longTTL: number = 5 * 60 * 1000 // 5 minutes for less critical data

  /**
   * Get data from cache or fetch it
   */
  async get<T>(
    key: string,
    fetcher: () => Promise<T>,
    options: { ttl?: number; tags?: string[] } = {},
  ): Promise<T> {
    const ttl = options.ttl ?? this.defaultTTL
    const now = Date.now()
    const cached = this.cache.get(key) as CacheEntry<T> | undefined

    // Return cached data if still valid
    if (cached && now - cached.timestamp < ttl) {
      console.log(`[Cache] Hit: ${key}`)
      return cached.data
    }

    console.log(`[Cache] Miss: ${key}`)

    // Fetch fresh data
    const data = await fetcher()

    // Store in cache
    this.cache.set(key, {
      data,
      timestamp: now,
    })

    return data
  }

  /**
   * Set data in cache
   */
  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    })
  }

  /**
   * Invalidate cache by key
   */
  invalidate(key: string): boolean {
    console.log(`[Cache] Invalidating: ${key}`)
    return this.cache.delete(key)
  }

  /**
   * Invalidate cache by pattern (prefix match)
   */
  invalidatePattern(pattern: string): void {
    console.log(`[Cache] Invalidating pattern: ${pattern}`)
    for (const key of this.cache.keys()) {
      if (key.startsWith(pattern)) {
        this.cache.delete(key)
      }
    }
  }

  /**
   * Invalidate all cache
   */
  invalidateAll(): void {
    console.log('[Cache] Invalidating all cache')
    this.cache.clear()
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    }
  }

  /**
   * Generate cache key for collections
   */
  static getCollectionKey(
    collection: string,
    operation: string,
    params?: Record<string, unknown>,
  ): string {
    const paramsStr = params ? `:${JSON.stringify(params)}` : ''
    return `collection:${collection}:${operation}${paramsStr}`
  }

  /**
   * Generate cache key for globals
   */
  static getGlobalKey(slug: string): string {
    return `global:${slug}`
  }
}

// Export singleton instance
export const cacheService = new CacheService()

// Export for testing
export { CacheService }
