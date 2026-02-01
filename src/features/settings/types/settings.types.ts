import { GlobalSetting as PayloadGlobalSettings, Media } from "@/payload-types";

/**
 * Social media item with enabled status
 */
export interface SocialMedia {
  platform: 'instagram' | 'tiktok' | 'facebook' | 'twitter' | 'youtube' | 'linkedin'
  url: string
  isEnabled: boolean
  id?: string
}

/**
 * Extended GlobalSettings with relations populated
 */
export interface GlobalSettings extends Omit<
  PayloadGlobalSettings,
  'branding' | 'socialMedia'
> {
  branding?: {
    logoNavbar?: Media | null
    logoFooter?: Media | null
  }
  socialMedia?: SocialMedia[]
  footerContent?: {
    ctaQuote?: string | null
  }
}

/**
 * Simplified type for public use
 */
export interface PublicSettings {
  logoNavbar?: Media
  logoFooter?: Media
  socialMedia?: SocialMedia[]
  ctaQuote?: string
}
