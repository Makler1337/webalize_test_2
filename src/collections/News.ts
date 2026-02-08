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
      name: 'category',
      type: 'text',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'English',
          fields: [
            { name: 'title_en', label: 'Title (EN)', type: 'text', required: true },
            { name: 'excerpt_en', label: 'Excerpt (EN)', type: 'textarea' },
            { name: 'content_en', label: 'Content (EN)', type: 'richText' },
          ],
        },
        {
          label: 'German',
          fields: [
            { name: 'title_de', label: 'Title (DE)', type: 'text', required: true },
            { name: 'excerpt_de', label: 'Excerpt (DE)', type: 'textarea' },
            { name: 'content_de', label: 'Content (DE)', type: 'richText' },
          ],
        },
      ],
    },
  ],
}
