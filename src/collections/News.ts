import type { CollectionConfig } from 'payload'

export const News: CollectionConfig = {
  slug: 'news',
  admin: {
    useAsTitle: 'title_en',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'readTime',
      type: 'select',
      required: true,
      options: [
        { label: '5 min', value: '5min' },
        { label: '10 min', value: '10min' },
        { label: '30 min', value: '30min' },
        { label: '1 hour', value: '1hour' },
        { label: '2 hours', value: '2hours' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'English',
          fields: [
            { name: 'title_en', label: 'Title (EN)', type: 'text', required: true },
            { name: 'description_en', label: 'Description (EN)', type: 'textarea', required: true },
            { name: 'content_en', label: 'Content (EN)', type: 'richText', required: true },
          ],
        },
        {
          label: 'German',
          fields: [
            { name: 'title_de', label: 'Title (DE)', type: 'text', required: true },
            { name: 'description_de', label: 'Description (DE)', type: 'textarea', required: true },
            { name: 'content_de', label: 'Content (DE)', type: 'richText', required: true },
          ],
        },
      ],
    },
  ],
}
