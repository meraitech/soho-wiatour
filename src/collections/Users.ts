import type { CollectionConfig } from 'payload'
import { checkRole } from '@/shared/lib/access'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'roles'],
  },
  auth: true,
  access: {
    read: ({ req }) => checkRole(req.user, 'admin'),
    create: ({ req }) => checkRole(req.user, 'admin'),
    update: ({ req }) => checkRole(req.user, 'admin'),
    delete: ({ req }) => checkRole(req.user, 'admin'),
  },
  fields: [
    // Email added by default
    {
      name: 'roles',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      admin: {
        description: 'All users are admins with full access to the admin panel',
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      ({
        data,
        operation
      }) => {
        // For new users, default to admin role
        if (operation === 'create' && !data.roles) {
          data.roles = 'admin'
        }
      },
    ],
  },
}
