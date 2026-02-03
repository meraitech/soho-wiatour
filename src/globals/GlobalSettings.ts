import { GlobalConfig } from "payload";
import { checkRole } from "@/shared/lib/access";

export const GlobalSettings: GlobalConfig = {
  slug: 'global-settings',
  access: {
    read: () => true,
    update: ({ req }) => checkRole(req.user, 'admin'),
  },
  fields: [
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        {
          name: 'logoNavbar',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Logo Navbar',
          admin: {
            description: 'Logo yang ditampilkan di navbar',
          },
        },
        {
          name: 'logoFooter',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Logo Footer',
          admin: {
            description: 'Logo yang ditampilkan di footer',
          },
        },
      ],
    },
    {
      name: 'adminBranding',
      type: 'group',
      label: 'Admin Branding',
      admin: {
        description: 'Kustomisasi tampilan admin panel',
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Admin Logo',
          admin: {
            description: 'Logo yang ditampilkan di header admin panel (recommended: 200x60px)',
          },
        },
        {
          name: 'icon',
          type: 'upload',
          relationTo: 'media',
          required: false,
          label: 'Admin Icon',
          admin: {
            description: 'Icon yang ditampilkan di sidebar admin panel (recommended: 30x30px)',
          },
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'array',
      label: 'Social Media',
      fields: [
        {
          name: 'platform',
          type: 'select',
          required: true,
          label: 'Platform',
          options: [
            { label: 'Instagram', value: 'instagram' },
            { label: 'TikTok', value: 'tiktok' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Twitter/X', value: 'twitter' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'LinkedIn', value: 'linkedin' },
          ],
        },
        {
          name: 'url',
          type: 'text',
          required: true,
          label: 'URL',
          admin: {
            description: 'Link ke profil social media',
          },
        },
        {
          name: 'isEnabled',
          type: 'checkbox',
          label: 'Tampilkan di Website',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'footerContent',
      type: 'group',
      label: 'Footer Content',
      fields: [
        {
          name: 'ctaQuote',
          type: 'textarea',
          required: false,
          label: 'CTA Quote',
          admin: {
            description: 'Quote inspiratif untuk CTA section di footer',
          },
        },
      ],
    },
  ],
};
