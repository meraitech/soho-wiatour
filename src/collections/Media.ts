import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',

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
