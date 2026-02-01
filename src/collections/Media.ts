import type { CollectionConfig } from 'payload'
import { checkRole, hasAnyRole } from '@/shared/lib/access'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs/promises'
import path from 'path'

// Check if R2 is configured
const useR2 = process.env.R2_ACCOUNT_ID &&
  process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY &&
  process.env.R2_BUCKET_NAME &&
  process.env.R2_PUBLIC_URL

// Initialize R2 client if configured
const r2Client = useR2 ? new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
}) : null

const r2BucketName = process.env.R2_BUCKET_NAME || ''
const r2PublicUrl = process.env.R2_PUBLIC_URL || ''

// Helper function to upload file to R2
async function uploadToR2(filename: string, filePath: string, mimeType: string): Promise<string> {
  // Use filename as-is, don't add timestamp
  // This allows easy mapping between original requests and R2 files

  // Read file from filesystem
  const fileBuffer = await fs.readFile(filePath)

  const params = {
    Bucket: r2BucketName,
    Key: filename,
    Body: fileBuffer,
    ContentType: mimeType,
  }

  await r2Client!.send(new PutObjectCommand(params))
  return `${r2PublicUrl}/${filename}`
}

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    defaultColumns: ['alt', 'updatedAt'],
    description: 'Upload images with maximum size of 2MB. Supported formats: JPG, PNG, WebP, GIF, and other image formats.',
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
    staticDir: useR2 ? '/tmp/payload-media' : 'media',
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
  hooks: useR2 ? {
    beforeValidate: [
      async ({ data }) => {
        // Check file size before validation using data.filesize (2MB = 2097152 bytes)
        const maxSize = 2 * 1024 * 1024 // 2MB

        const filesize = (data as any)?.filesize
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

            // Upload original file to R2 first
            const originalPath = path.join(mediaDir, result.filename)
            try {
              // Check if original file exists
              await fs.access(originalPath)

              // Get MIME type from result or fallback to detection from filename
              const mimeType = (result as any).mimeType || 'image/jpeg'

              // Upload original file to R2
              const originalUrl = await uploadToR2(result.filename, originalPath, mimeType)
              result.url = originalUrl

              // Delete original file from temp storage after upload
              await fs.unlink(originalPath).catch(() => {})
            } catch (err) {
              console.error('[R2 Upload] Error uploading original file:', err)
            }

            // Upload image sizes to R2
            if (result.sizes) {
              for (const [sizeName, sizeData] of Object.entries(result.sizes)) {
                if (sizeData && typeof sizeData === 'object' && 'filename' in sizeData && sizeData.filename) {
                  const sizeFilename = sizeData.filename as string
                  const sizePath = path.join(mediaDir, sizeFilename)

                  try {
                    // Check if file exists before uploading
                    await fs.access(sizePath)

                    const sizeUrl = await uploadToR2(sizeFilename, sizePath, 'image/webp')
                    ;(result.sizes as any)[sizeName] = {
                      ...sizeData,
                      url: sizeUrl,
                      filename: sizeFilename  // Keep the original size filename
                    }

                    // Delete size file from temp storage after upload
                    await fs.unlink(sizePath).catch(() => {})
                  } catch (err) {
                    console.error(`[R2 Upload] Error uploading ${sizeName}:`, err)
                  }
                }
              }
            }

          } catch (error) {
            console.error('[R2 Upload] Error in R2 upload process:', error)
          }
        }
        return result
      }
    ],
    afterDelete: [
      async ({ doc }) => {
        // Files are already deleted by Payload, just clean up from R2 if needed
        // This is a safety check in case R2 has files that shouldn't be there
        if (doc.filename) {
          try {
            const params = {
              Bucket: r2BucketName,
              Key: doc.filename,
            }
            await r2Client!.send(new DeleteObjectCommand(params))
          } catch (error) {
            // Ignore errors if file doesn't exist in R2
            console.debug('File not in R2 or already deleted')
          }
        }

        // Delete image sizes from R2
        if (doc.sizes) {
          for (const sizeData of Object.values(doc.sizes)) {
            if (sizeData && typeof sizeData === 'object' && 'filename' in sizeData) {
              try {
                const params = {
                  Bucket: r2BucketName,
                  Key: sizeData.filename as string,
                }
                await r2Client!.send(new DeleteObjectCommand(params))
              } catch (error) {
                // Ignore errors if file doesn't exist in R2
                console.debug('Size file not in R2 or already deleted')
              }
            }
          }
        }
      }
    ]
  } : undefined,

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'alt text'
    },
  ],
}
