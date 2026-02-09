import type { CollectionConfig } from 'payload'

export const Integrations: CollectionConfig = {
  slug: 'integrations',
  admin: {
    useAsTitle: 'name',
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
      name: 'platform',
      type: 'select',
      required: true,
      options: [
        { label: 'Truck OEMs', value: 'truck-oems' },
        { label: 'Telematics', value: 'telematics' },
        { label: 'TMS', value: 'tms' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'name', type: 'text', required: true, localized: true },
    { name: 'description', type: 'textarea', required: true, localized: true },
  ],
}
