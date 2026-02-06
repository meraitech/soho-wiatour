import type { CollectionConfig } from 'payload'
import { checkRole } from '@/shared/lib/access'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import fs from 'fs/promises'
import path from 'path'

// Check if R2 is configured
const useR2 =
  process.env.R2_ACCOUNT_ID &&
  process.env.R2_ACCESS_KEY_ID &&
  process.env.R2_SECRET_ACCESS_KEY &&
  process.env.R2_BUCKET_NAME &&
  process.env.R2_PUBLIC_URL

// Initialize R2 client if configured
const r2Client = useR2
  ? new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  })
  : null

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
    description:
      'Upload images with maximum size of 2MB. Supported formats: JPG, PNG, WebP, GIF, and other image formats.',
  },
  access: {
    // Public read access - images are used in frontend
    read: () => true,
    // Only admins can upload media
    create: ({ req }) => checkRole(req.user, 'admin'),
    // Only admins can update media
    update: ({ req }) => checkRole(req.user, 'admin'),
    // Only admins can delete media
    delete: ({ req }) => checkRole(req.user, 'admin'),
  },
  upload: {
    staticDir: useR2 ? '/tmp/payload-media' : 'media',
    mimeTypes: ['image/*'],
    // Convert all uploads to WebP format for optimal size and quality
    formatOptions: {
      format: 'webp',
      options: {
        quality: 85,
      },
    },
  },
  hooks: useR2
    ? {
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
        },
      ],
      afterChange: [
        async ({ doc, req, operation }) => {
          // Skip if this is just a URL update (not a file upload)
          if ((req.context as any)?.skipR2Upload) {
            return doc
          }

          // Only proceed if we have a new file to upload
          if (!doc?.filename) {
            return doc
          }

          try {
            const mediaDir = '/tmp/payload-media'
            const filePath = path.join(mediaDir, doc.filename)

            try {
              // Check if the new file exists in temp storage
              await fs.access(filePath)

              // For update operations, delete file with same name from R2 first
              // This works when replacing with same filename
              if (operation === 'update') {
                try {
                  const params = {
                    Bucket: r2BucketName,
                    Key: doc.filename,
                  }
                  await r2Client!.send(new DeleteObjectCommand(params))
                  console.log('[R2 Upload] Deleted old file from R2:', doc.filename)
                } catch (err) {
                  // File might not exist in R2 yet, that's OK
                  console.debug('[R2 Upload] File not in R2 yet, skipping delete')
                }
              }

              // Get MIME type (should be image/webp after conversion)
              const mimeType = doc.mimeType || 'image/webp'

              // Upload new file to R2
              const fileUrl = await uploadToR2(doc.filename, filePath, mimeType)

              console.log('[R2 Upload] File uploaded successfully:', doc.filename)

              // Delete file from temp storage after upload
              await fs.unlink(filePath).catch(() => { })

              // Update the URL in the database
              await req.payload.update({
                collection: 'media',
                id: doc.id,
                data: { url: fileUrl },
                context: { skipR2Upload: true },
                req,
              })
            } catch (err) {
              // File might not exist in temp (already processed)
              console.debug('[R2 Upload] File not in temp storage or already processed')
            }
          } catch (error) {
            console.error('[R2 Upload] Error in R2 upload process:', error)
          }

          return doc
        },
      ],
      afterDelete: [
        async ({ doc }) => {
          // Files are already deleted by Payload, just clean up from R2 if needed
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
        },
      ],
    }
    : undefined,

  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'alt text',
    },
  ],
}
