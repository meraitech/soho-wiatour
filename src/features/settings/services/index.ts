// Export optimized services (recommended for new code)
export { OptimizedSettingsService } from './settings.service.optimized'

// Export original service for backward compatibility
export { SettingsService } from './settings.service'

// Re-export for convenience - using optimized version by default
export { OptimizedSettingsService as SettingsServiceOptimized } from './settings.service.optimized'
