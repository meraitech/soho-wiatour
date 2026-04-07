import { type NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cacheService } from '@/shared/lib/cache'

/**
 * Revalidation API Endpoint
 *
 * This endpoint handles cache invalidation requests from Payload CMS webhooks
 * or manual revalidation requests.
 *
 * Supports:
 * - Path revalidation (Next.js ISR)
 * - Tag-based revalidation
 * - In-memory cache invalidation
 *
 * Usage:
 * POST /api/revalidate
 * Body: {
 *   secret: string,
 *   paths?: string[],
 *   tags?: string[],
 *   invalidateCache?: boolean
 * }
 */

// Secret key for webhook authentication (should match PAYLOAD_REVALIDATE_SECRET env var)
const REVALIDATE_SECRET = process.env.PAYLOAD_REVALIDATE_SECRET

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { secret, paths, tags, invalidateCache = true, collection } = body

    // Verify secret
    if (REVALIDATE_SECRET && secret !== REVALIDATE_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
    }

    const results: {
      pathsRevalidated: string[]
      tagsRevalidated: string[]
      cacheInvalidated: boolean
      errors: string[]
    } = {
      pathsRevalidated: [],
      tagsRevalidated: [],
      cacheInvalidated: false,
      errors: [],
    }

    // Revalidate specific paths
    if (paths && Array.isArray(paths)) {
      for (const path of paths) {
        try {
          revalidatePath(path, 'page')
          results.pathsRevalidated.push(path)
          console.log(`[Revalidate] Path: ${path}`)
        } catch (error) {
          results.errors.push(`Failed to revalidate path: ${path}`)
          console.error(`[Revalidate] Error revalidating path ${path}:`, error)
        }
      }
    }

    // Revalidate by tags
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        try {
          revalidateTag(tag, 'default')
          results.tagsRevalidated.push(tag)
          console.log(`[Revalidate] Tag: ${tag}`)
        } catch (error) {
          results.errors.push(`Failed to revalidate tag: ${tag}`)
          console.error(`[Revalidate] Error revalidating tag ${tag}:`, error)
        }
      }
    }

    // Invalidate in-memory cache
    if (invalidateCache) {
      try {
        if (collection) {
          // Invalidate specific collection cache
          cacheService.invalidatePattern(`collection:${collection}:`)
          console.log(`[Revalidate] Cache invalidated for collection: ${collection}`)
        } else {
          // Invalidate all cache
          cacheService.invalidateAll()
          console.log('[Revalidate] All cache invalidated')
        }
        results.cacheInvalidated = true
      } catch (error) {
        results.errors.push('Failed to invalidate cache')
        console.error('[Revalidate] Error invalidating cache:', error)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Revalidation completed',
      ...results,
    })
  } catch (error) {
    console.error('[Revalidate] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', message: (error as Error).message },
      { status: 500 },
    )
  }
}

/**
 * GET handler for checking cache status
 */
export async function GET() {
  const stats = cacheService.getStats()

  return NextResponse.json({
    cacheSize: stats.size,
    cachedKeys: stats.keys,
  })
}
