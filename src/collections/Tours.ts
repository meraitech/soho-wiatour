import { formatSlug } from "@/shared/lib/utils";
import { CollectionConfig } from "payload";
import { checkRole, hasAnyRole } from "@/shared/lib/access";

export const Tours: CollectionConfig = {
  slug: 'tours',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['thumbnail', 'title', 'status', 'createdAt'],
  },
  access: {
    // Public read access - anyone can view tours
    read: () => true,
    // Only admins and editors can create tours
    create: ({ req }) => hasAnyRole(req.user, ['admin', 'editor']),
    // Only admins and editors can update tours
    update: ({ req }) => hasAnyRole(req.user, ['admin', 'editor']),
    // Only admins can delete tours
    delete: ({ req }) => checkRole(req.user, 'admin'),
  },
  fields: [
    //-- List Toure Page Data
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tour Title',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'URL Slug',
      admin: {
        position: 'sidebar',
        description: 'Auto-generated dari title, bisa diedit manual',
      },
      hooks: {
        beforeValidate: [
          ({ value, data, operation }) => {
            if (operation === 'create') {
              // Saat create: pakai value jika ada, atau generate dari title
              return value || (data?.title ? formatSlug(data.title) : value)
            }
            // Saat update: format value jika diubah
            return value ? formatSlug(value) : value
          },
        ],
      },
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Thumbnail',
      admin: {
        description: 'Gambar untuk tampil di list tours',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      maxLength: 300,
      label: 'Description',
      admin: {
        description: 'Deskripsi untuk tours (max 300 karakter)'
      }
    },

    // --- SECTION 1: HERO ---
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Hero Image',
      admin: {
        description: 'Gambar besar di bagian atas detail page',
      },
    },

    // --- SECTION 2: DETAIL PERJALANAN ---
    {
      name: 'travelDetails',
      type: 'array',
      label: 'Detail Perjalanan',
      admin: {
        description: 'Tambahkan beberapa baris gambar + deskripsi (ditampilkan 2 kolom bergantian)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Gambar',
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          label: 'Deskripsi',
        },
      ],
    },

    // --- SECTION 3: RENCANA PERJALANAN ---
    {
      name: 'itineraries',
      type: 'array',
      label: 'Rencana Perjalanan',
      admin: {
        description: 'List kegiatan per hari dengan icon dan thumbnail',
      },
      fields: [
        {
          name: 'day',
          type: 'number',
          required: true,
          label: 'Hari ke-',
          admin: {
            description: 'Contoh: 1, 2, 3',
          },
        },
        {
          name: 'activityName',
          type: 'text',
          required: true,
          label: 'Nama Kegiatan',
          admin: {
            description: 'Contoh: Ngumpul di bandara',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Icon',
          admin: {
            description: 'Icon kecil untuk kegiatan (emoji atau logo)',
          },
        },
        {
          name: 'thumbnail',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Thumbnail Kegiatan',
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Deskripsi Kegiatan',
        },
      ],
    },

    // --- SECTION 4: GALLERY ---
    {
      name: 'gallery',
      type: 'array',
      label: 'Galleri',
      admin: {
        description: 'Kumpulan foto tour (bisa banyak)',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },

    // --- SECTION 5: TOUR LAINNYA ---
    {
      name: 'relatedTours',
      type: 'relationship',
      relationTo: 'tours',
      hasMany: true,
      maxDepth: 1,
      label: 'Tour Lainnya',
      admin: {
        description: 'Pilih tour lain yang relevan untuk ditampilkan',
      },
    },

    // --- METADATA ---
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      label: 'Status',
    },
  ]
}

