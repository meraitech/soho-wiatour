import type { CollectionConfig } from 'payload'
import { checkRole, hasAnyRole } from '@/shared/lib/access'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['alt', 'updatedAt'],
  },
  access: {
    // Public read access - images are used in frontend
    read: () => true,
    // Only admins and editors can upload media
    create: ({ req }) => hasAnyRole(req.user, ['admin', 'editor']),
    // Only admins and editors can update media
    update: ({ req }) => hasAnyRole(req.user, ['admin', 'editor']),
    // Only admins can delete media
    delete: ({ req }) => checkRole(req.user, 'admin'),
  },
  upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80
          }
        }
      },
      {
        name: 'card',
        width: 768,
        height: 512,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 85,
          }
        }
      },
      {
        name: 'hero',
        width: 1920,
        height: 1080,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 90,
          }
        }
      },
    ]
  },

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'alt text'
    },
  ],
}
