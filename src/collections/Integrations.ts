import type { CollectionConfig } from 'payload'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'name_en',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'link',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'English',
          fields: [
            { name: 'name_en', label: 'Name (EN)', type: 'text', required: true },
            { name: 'description_en', label: 'Description (EN)', type: 'textarea', required: true },
          ],
        },
        {
          label: 'German',
          fields: [
            { name: 'name_de', label: 'Name (DE)', type: 'text', required: true },
            { name: 'description_de', label: 'Description (DE)', type: 'textarea', required: true },
          ],
        },
      ],
    },
  ],
}
