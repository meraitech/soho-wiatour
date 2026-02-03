import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

// Cache admin branding for 1 hour to minimize database queries
const getCachedAdminBranding = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const globalSettings = await payload.findGlobal({
      slug: 'global-settings',
      depth: 1, // Populate media relations
    })
    return globalSettings?.adminBranding || {}
  },
  ['admin-branding'],
  { revalidate: 3600 }, // 1 hour
)

export const Icon = async () => {
  let iconUrl = '/favicon.ico' // Default fallback to favicon

  try {
    const adminBranding = await getCachedAdminBranding()
    // Check if icon exists and is a Media object (has url property)
    if (
      adminBranding.icon &&
      typeof adminBranding.icon === 'object' &&
      'url' in adminBranding.icon
    ) {
      const url = adminBranding.icon.url
      if (typeof url === 'string') {
        iconUrl = url
      }
    }
  } catch (error) {
    console.error('[Icon] Failed to fetch admin branding:', error)
    // Use default fallback on error
  }
  return <img src={iconUrl} alt="Wiatour Icon" width={30} height={30} />
}
