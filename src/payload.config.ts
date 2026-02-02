import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Tours } from './collections/Tours'
import { Testimonials } from './collections/Testimonials'
import { GlobalSettings } from './globals/GlobalSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: {
          path: './shared/components/admin/Logo',
          exportName: 'Logo'
        },
        Icon: {
          path: './shared/components/admin/Icon',
          exportName: 'Icon'
        }
      },
      views: {
        Dashboard: {
          Component: './shared/components/admin/Dashboard',
        }
      }
    }
  },
  collections: [Users, Media, Tours, Testimonials],
  globals: [GlobalSettings],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || '',
  }),
  sharp,
  plugins: [],

})
