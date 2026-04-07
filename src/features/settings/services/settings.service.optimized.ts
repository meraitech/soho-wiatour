/**
 * Optimized Settings Service with Caching
 *
 * This service provides optimized data fetching for global settings with:
 * - Built-in caching for better performance
 * - 5 minute cache for globals (change less frequently)
 * - Deduplicated requests
 */

import { payloadService } from '@/shared/lib/payload-service'
import { GlobalSettings, PublicSettings } from '../types'

export class OptimizedSettingsService {
  /**
   * Get full global settings from CMS
   * Uses 5 minute cache since globals change less frequently
   */
  static async getGlobal(): Promise<GlobalSettings | null> {
    return payloadService.findGlobal<GlobalSettings>('global-settings', {
      depth: 2,
      cache: true,
      cacheTTL: 300000, // 5 minutes
    })
  }

  /**
   * Get public-friendly settings (only enabled social media, filters null values)
   */
  static async getPublicSettings(): Promise<PublicSettings> {
    const settings = await this.getGlobal()

    if (!settings) {
      return {}
    }

    return {
      logoNavbar: settings.branding?.logoNavbar || undefined,
      logoFooter: settings.branding?.logoFooter || undefined,
      socialMedia: settings.socialMedia?.filter((sm) => sm.isEnabled) || [],
      ctaQuote: settings.footerContent?.ctaQuote || undefined,
    }
  }

  /**
   * Get only enabled social media links
   */
  static async getEnabledSocialMedia(): Promise<GlobalSettings['socialMedia']> {
    const settings = await this.getGlobal()

    if (!settings?.socialMedia) {
      return []
    }

    return settings.socialMedia.filter((sm) => sm.isEnabled)
  }

  /**
   * Invalidate settings cache - call this when settings are modified
   */
  static invalidateCache(): void {
    payloadService.invalidateGlobal('global-settings')
  }
}
