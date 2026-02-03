import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from '@payload-config';
import { GlobalSettings, PublicSettings } from "../types";

export class SettingsService {
  private static async getPayload() {
    return getPayloadHMR({ config: configPromise })
  }

  /**
   * Get full global settings from CMS
   * @returns Global settings object with all data or null if not initialized
   * @example
   * const settings = await SettingsService.getGlobal()
   * // Returns: { branding: { logoNavbar: Media, ... }, socialMedia: [...], ... }
   */
  static async getGlobal(): Promise<GlobalSettings | null> {
    const payload = await this.getPayload()

    try {
      const settings = await payload.findGlobal({
        slug: 'global-settings',
        depth: 2,
      })

      return settings as GlobalSettings
    } catch (error) {
      console.error('Error fetching global settings:', error)
      return null
    }
  }

  /**
   * Get public-friendly settings (only enabled social media, filters null values)
   * @returns Public settings object with safe defaults for frontend use
   * @example
   * const public = await SettingsService.getPublicSettings()
   * // Returns: { logoNavbar: Media, logoFooter: Media, socialMedia: [...], ctaQuote: '...' }
   */
  static async getPublicSettings(): Promise<PublicSettings> {
    const settings = await this.getGlobal()

    if (!settings) {
      return {}
    }

    return {
      logoNavbar: settings.branding?.logoNavbar || undefined,
      logoFooter: settings.branding?.logoFooter || undefined,
      socialMedia: settings.socialMedia?.filter(sm => sm.isEnabled) || [],
      ctaQuote: settings.footerContent?.ctaQuote || undefined,
    }
  }

  /**
   * Get only enabled social media links
   * @returns Array of enabled social media objects or empty array
   * @example
   * const socialMedia = await SettingsService.getEnabledSocialMedia()
   * // Returns: [{ platform: 'instagram', url: 'https://...', isEnabled: true }, ...]
   */
  static async getEnabledSocialMedia(): Promise<GlobalSettings['socialMedia']> {
    const settings = await this.getGlobal()

    if (!settings?.socialMedia) {
      return []
    }

    return settings.socialMedia.filter(sm => sm.isEnabled)
  }
}
