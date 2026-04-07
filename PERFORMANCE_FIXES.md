# Performance & Real-time Data Update Fixes

This document outlines the changes made to fix real-time data update issues and improve website performance.

## Problems Fixed

### 1. Real-time Data Updates Not Working

**Problem:** When adding data from wiatour.com/admin, the website didn't reflect changes immediately.

**Root Cause:**

- Next.js caches Server Component data by default
- No cache invalidation strategy was implemented
- Pages were using static rendering by default

**Solution:**

- Added `export const dynamic = 'force-dynamic'` to all pages
- Added `export const revalidate = 0` to disable static generation
- Implemented automatic cache invalidation via Payload hooks
- Created a revalidation API endpoint for webhook support

### 2. Website Performance Issues

**Problem:** Website was loading slowly due to multiple factors.

**Root Causes:**

- Multiple separate database queries on every page load
- No caching for frequently accessed data
- Heavy client-side libraries (GSAP, Lenis) loading on every page
- Images not optimized
- No HTTP caching headers

**Solution:**

- Implemented centralized caching service with 30-second TTL for near real-time updates
- Created optimized service layer with request deduplication
- Added HTTP caching headers for static assets (1 year cache)
- Configured Next.js image optimization with WebP/AVIF formats
- Added performance optimizations to next.config.mjs

## New Files Created

### 1. Cache Service (`src/shared/lib/cache.ts`)

Centralized in-memory caching service with:

- Time-based cache expiration (TTL)
- Pattern-based cache invalidation
- Cache statistics for monitoring

### 2. Optimized Payload Service (`src/shared/lib/payload-service.ts`)

Service wrapper with:

- Built-in caching for all database operations
- Singleton pattern for Payload instance
- Proper TypeScript typing

### 3. Cache Hooks (`src/shared/lib/cache-hooks.ts`)

Payload hooks for automatic cache invalidation:

- `createCacheInvalidationHook()` - For collections
- `createCacheInvalidationDeleteHook()` - For delete operations
- `createGlobalCacheInvalidationHook()` - For globals

### 4. Revalidation API (`src/app/api/revalidate/route.ts`)

API endpoint for cache invalidation:

- `POST /api/revalidate` - Invalidate cache by paths/tags
- `GET /api/revalidate` - Check cache statistics
- Protected by secret token

### 5. Optimized Services

- `src/features/tours/services/tour.service.optimized.ts`
- `src/features/testimonials/services/testimonial.service.optimized.ts`
- `src/features/settings/services/settings.service.optimized.ts`

## Updated Files

### Collections

- `src/collections/Tours.ts` - Added cache invalidation hooks
- `src/collections/Testimonials.ts` - Added cache invalidation hooks
- `src/globals/GlobalSettings.ts` - Added cache invalidation hooks

### Pages

All pages updated to use dynamic rendering:

- `src/app/(frontend)/page.tsx`
- `src/app/(frontend)/tours/page.tsx`
- `src/app/(frontend)/tours/[slugName]/page.tsx`

### Components

- `src/features/tours/components/TourHighlight.tsx` - Uses optimized service
- `src/shared/components/layout/Footer.tsx` - Uses optimized settings service

### Configuration

- `next.config.mjs` - Performance optimizations and caching headers

## Environment Variables

Add these to your `.env` file:

```env
# Secret for revalidation API (generate a strong random string)
PAYLOAD_REVALIDATE_SECRET=your-strong-secret-key-here

# Public site URL (for revalidation webhooks)
NEXT_PUBLIC_SITE_URL=https://wiatour.com
```

## How It Works

### Real-time Updates Flow

1. **Admin publishes content** in Payload CMS
2. **Payload hooks trigger** automatically after save/delete
3. **Cache is invalidated** for the affected collection
4. **Revalidation API** is called to regenerate pages
5. **Next.js re-renders** pages with fresh data

### Caching Strategy

- **Tours/Testimonials**: 30-second cache for near real-time updates
- **Settings/Global**: 5-minute cache (changes less frequently)
- **Static Assets**: 1-year cache (images, brand assets)
- **API Media**: 1-year cache (immutable media files)

### Performance Improvements

1. **Request Deduplication**: Same requests within cache window return cached data
2. **Singleton Payload Instance**: Avoids recreating Payload instance on each request
3. **Optimized Images**: WebP/AVIF formats with responsive sizes
4. **HTTP Caching**: Proper cache headers for static assets
5. **Bundle Optimization**: Lazy loading for heavy libraries

## Monitoring

Check cache statistics:

```bash
curl https://wiatour.com/api/revalidate
```

Manual revalidation:

```bash
curl -X POST https://wiatour.com/api/revalidate \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "your-secret-key",
    "paths": ["/", "/tours"],
    "collection": "tours"
  }'
```

## Migration Guide

### For Existing Code

To use optimized services in new components:

```typescript
// Old way
import { TourService } from '@/features/tours/services'
const tours = await TourService.getAll()

// New way (optimized)
import { OptimizedTourService } from '@/features/tours/services'
const tours = await OptimizedTourService.getAll()
```

### For New Pages

Add dynamic rendering at the top:

```typescript
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Page() {
  // Your page code
}
```

## Testing

After deployment:

1. **Test real-time updates:**
   - Add a new tour in admin
   - Check if it appears on website within 30 seconds

2. **Test cache invalidation:**
   - Update an existing tour
   - Verify changes reflect immediately

3. **Monitor performance:**
   - Check page load times
   - Verify cache statistics endpoint

## Troubleshooting

### Data not updating

- Check if `PAYLOAD_REVALIDATE_SECRET` is set correctly
- Verify hooks are registered in collection configs
- Check server logs for cache invalidation messages

### Slow performance

- Verify cache is working (check `/api/revalidate` stats)
- Ensure `next.config.mjs` changes are deployed
- Check if images are being served in WebP format

### Cache not invalidating

- Verify `NEXT_PUBLIC_SITE_URL` is correct
- Check revalidation API is accessible
- Review server logs for webhook errors
