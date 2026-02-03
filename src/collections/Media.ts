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
<<<<<<< Updated upstream
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        formatOptions: {
          format: 'webp',
          options: {
            quality: 80
=======
    // Convert all uploads to WebP format for optimal size and quality
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85
      }
    }
  },
  hooks: useR2 ? {
    beforeValidate: [
      async ({ data }) => {
        // Check file size before validation using data.filesize (2MB = 2097152 bytes)
        const maxSize = 2 * 1024 * 1024 // 2MB

        const filesize = (data)?.filesize
        if (filesize && filesize > maxSize) {
          const sizeInMB = (filesize / 1024 / 1024).toFixed(2)
          const errorMessage = `File size exceeds 2MB limit. Your file is ${sizeInMB}MB`

          // Log to console for debugging
          console.error('[Media Validation]', errorMessage)

          // Throw error - Payload will catch and display
          const error = new Error(errorMessage) as any
          error.name = 'ValidationError'
          error.field = 'file'
          throw error
        }

        return data
      }
    ],
    afterOperation: [
      async ({ operation, result }) => {
        // Upload to R2 after file is processed and saved by Payload
        if ((operation === 'create' || operation === 'update') && result && result.filename) {
          try {
            const mediaDir = '/tmp/payload-media'

            // Upload converted WebP file to R2
            const filePath = path.join(mediaDir, result.filename)
            try {
              // Check if file exists
              await fs.access(filePath)

              // Get MIME type (should be image/webp after conversion)
              const mimeType = (result as any).mimeType || 'image/webp'

              // Upload file to R2
              const fileUrl = await uploadToR2(result.filename, filePath, mimeType)
              result.url = fileUrl

              // Delete file from temp storage after upload
              await fs.unlink(filePath).catch(() => { })
            } catch (err) {
              console.error('[R2 Upload] Error uploading file:', err)
            }

          } catch (error) {
            console.error('[R2 Upload] Error in R2 upload process:', error)
>>>>>>> Stashed changes
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
