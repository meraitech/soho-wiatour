/**
 * Payload Hooks for Cache Invalidation
 *
 * These hooks automatically invalidate cache when documents are
 * created, updated, or deleted in Payload CMS.
 */

import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { payloadService } from '@/shared/lib/payload-service'

/**
 * Invalidate cache after collection document changes
 */
export const createCacheInvalidationHook = (
  collection: string,
  pathsToRevalidate: string[] = [],
): CollectionAfterChangeHook => {
  return async ({ doc, req, operation }) => {
    try {
      // Invalidate collection cache
      payloadService.invalidateCollection(collection)
      console.log(`[Cache Hook] Invalidated cache for collection: ${collection}`)

      // Call revalidation API if paths are specified
      if (pathsToRevalidate.length > 0) {
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`

        await fetch(`${baseUrl}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: process.env.PAYLOAD_REVALIDATE_SECRET,
            paths: pathsToRevalidate,
            collection,
          }),
        }).catch((error) => {
          console.error('[Cache Hook] Failed to revalidate paths:', error)
        })
      }
    } catch (error) {
      console.error(`[Cache Hook] Error invalidating cache for ${collection}:`, error)
    }

    return doc
  }
}

/**
 * Invalidate cache after collection document is deleted
 */
export const createCacheInvalidationDeleteHook = (
  collection: string,
  pathsToRevalidate: string[] = [],
): CollectionAfterDeleteHook => {
  return async ({ doc, req }) => {
    try {
      // Invalidate collection cache
      payloadService.invalidateCollection(collection)
      console.log(`[Cache Hook] Invalidated cache for collection: ${collection} (delete)`)

      // Call revalidation API if paths are specified
      if (pathsToRevalidate.length > 0) {
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`

        await fetch(`${baseUrl}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: process.env.PAYLOAD_REVALIDATE_SECRET,
            paths: pathsToRevalidate,
            collection,
          }),
        }).catch((error) => {
          console.error('[Cache Hook] Failed to revalidate paths:', error)
        })
      }
    } catch (error) {
      console.error(`[Cache Hook] Error invalidating cache for ${collection} (delete):`, error)
    }

    return doc
  }
}

/**
 * Invalidate cache after global document changes
 */
export const createGlobalCacheInvalidationHook = (
  slug: string,
  pathsToRevalidate: string[] = [],
): GlobalAfterChangeHook => {
  return async ({ doc, req }) => {
    try {
      // Invalidate global cache
      payloadService.invalidateGlobal(slug)
      console.log(`[Cache Hook] Invalidated cache for global: ${slug}`)

      // Call revalidation API if paths are specified
      if (pathsToRevalidate.length > 0) {
        const baseUrl =
          process.env.NEXT_PUBLIC_SITE_URL || `http://localhost:${process.env.PORT || 3000}`

        await fetch(`${baseUrl}/api/revalidate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            secret: process.env.PAYLOAD_REVALIDATE_SECRET,
            paths: pathsToRevalidate,
          }),
        }).catch((error) => {
          console.error('[Cache Hook] Failed to revalidate paths:', error)
        })
      }
    } catch (error) {
      console.error(`[Cache Hook] Error invalidating cache for global ${slug}:`, error)
    }

    return doc
  }
}

/**
 * Pre-configured hooks for common collections
 */
export const cacheInvalidationHooks = {
  tours: {
    afterChange: createCacheInvalidationHook('tours', ['/', '/tours']),
    afterDelete: createCacheInvalidationDeleteHook('tours', ['/', '/tours']),
  },
  testimonials: {
    afterChange: createCacheInvalidationHook('testimonials', ['/']),
    afterDelete: createCacheInvalidationDeleteHook('testimonials', ['/']),
  },
  media: {
    afterChange: createCacheInvalidationHook('media'),
    afterDelete: createCacheInvalidationDeleteHook('media'),
  },
}

/**
 * Pre-configured hooks for globals
 */
export const globalCacheInvalidationHooks = {
  'global-settings': createGlobalCacheInvalidationHook('global-settings', ['/']),
}
