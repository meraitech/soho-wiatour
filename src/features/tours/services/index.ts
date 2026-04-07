// Export optimized services (recommended for new code)
export { OptimizedTourService } from './tour.service.optimized'

// Export original service for backward compatibility
export { TourService } from './tour.service'

// Re-export for convenience - using optimized version by default
export { OptimizedTourService as TourServiceOptimized } from './tour.service.optimized'
