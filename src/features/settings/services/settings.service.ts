import { getPayloadHMR } from "@payloadcms/next/utilities";
import configPromise from '@payload-config';
import { GlobalSettings, PublicSettings } from "../types";

export class SettingsService {
  private static async getPayload() {
    return getPayloadHMR({ config: configPromise })
  }

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

  static async getEnabledSocialMedia(): Promise<GlobalSettings['socialMedia']> {
    const settings = await this.getGlobal()

    if (!settings?.socialMedia) {
      return []
    }

    return settings.socialMedia.filter(sm => sm.isEnabled)
  }
}
