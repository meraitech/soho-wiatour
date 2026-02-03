<<<<<<< HEAD
<<<<<<< Updated upstream
'use client'
=======
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
>>>>>>> develop

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
  { revalidate: 3600 } // 1 hour
)
<<<<<<< HEAD
=======
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import Image from 'next/image'

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
=======
>>>>>>> develop

export const Logo = async () => {
  let logoUrl = '/icon.png' // Default fallback to static asset

  try {
    const adminBranding = await getCachedAdminBranding()
    // Check if logo exists and is a Media object (has url property)
<<<<<<< HEAD
    if (
      adminBranding.logo &&
      typeof adminBranding.logo === 'object' &&
      'url' in adminBranding.logo
    ) {
=======
    if (adminBranding.logo && typeof adminBranding.logo === 'object' && 'url' in adminBranding.logo) {
>>>>>>> develop
      const url = adminBranding.logo.url
      if (typeof url === 'string') {
        logoUrl = url
      }
    }
  } catch (error) {
    console.error('[Logo] Failed to fetch admin branding:', error)
<<<<<<< HEAD
  }

  return <Image src={logoUrl} alt="Wiatour Logo" width={200} height={60} />
}
>>>>>>> Stashed changes
=======
    // Use default fallback on error
  }

  return (
    <img
      src={logoUrl}
      alt="Wiatour Logo"
      width={200}
      height={60}
    />
  )
}
>>>>>>> develop
