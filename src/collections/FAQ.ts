import type { CollectionConfig } from 'payload'

export const FAQ: CollectionConfig = {
  slug: 'faq',
  admin: {
    useAsTitle: 'question_en',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'category',
      type: 'text',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'order',
      type: 'number',
      admin: { position: 'sidebar' },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'English',
          fields: [
            { name: 'question_en', label: 'Question (EN)', type: 'text', required: true },
            { name: 'answer_en', label: 'Answer (EN)', type: 'richText', required: true },
          ],
        },
        {
          label: 'German',
          fields: [
            { name: 'question_de', label: 'Question (DE)', type: 'text', required: true },
            { name: 'answer_de', label: 'Answer (DE)', type: 'richText', required: true },
          ],
        },
      ],
    },
  ],
}
