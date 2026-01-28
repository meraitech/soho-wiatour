import { CollectionConfig } from "payload";
import { hasAnyRole, checkRole } from "@/shared/lib/access";

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['image', 'name', 'status', 'createdAt'],
  },
  access: {
    // Public read access - anyone can view testimonials
    read: () => true,
    // Only admins and editors can create testimonials
    create: ({ req }) => hasAnyRole(req.user, ['admin', 'editor']),
    // Only admins and editors can update testimonials
    update: ({ req }) => hasAnyRole(req.user, ['admin', 'editor']),
    // Only admins can delete testimonials
    delete: ({ req }) => checkRole(req.user, 'admin'),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Name',
      admin: {
        description: 'Nama orang yang memberikan testimoni',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Photo',
      admin: {
        description: 'Foto orang yang memberikan testimoni',
      },
    },
    {
      name: 'quotes',
      type: 'textarea',
      required: true,
      label: 'Testimonial',
      admin: {
        description: 'Isi testimoni',
      },
    },
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
  ],
};
