// Export optimized services (recommended for new code)
export { OptimizedTestimonialService } from './testimonial.service.optimized'

// Export original service for backward compatibility
export { TestimonialService } from './testimonial.service'

// Re-export for convenience - using optimized version by default
export { OptimizedTestimonialService as TestimonialServiceOptimized } from './testimonial.service.optimized'
