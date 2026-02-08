import type { CollectionConfig } from 'payload'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'fullName',
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'fullName',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'companyName',
      label: 'Company Name',
      type: 'text',
      required: true,
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
      required: true,
    },
    {
      name: 'preferredDate',
      label: 'Preferred Date',
      type: 'date',
      required: true,
    },
    {
      name: 'preferredTime',
      label: 'Preferred Time',
      type: 'select',
      required: true,
      options: [
        { label: '9:00 AM', value: '09:00' },
        { label: '9:30 AM', value: '09:30' },
        { label: '10:00 AM', value: '10:00' },
        { label: '10:30 AM', value: '10:30' },
        { label: '11:00 AM', value: '11:00' },
        { label: '11:30 AM', value: '11:30' },
        { label: '12:00 PM', value: '12:00' },
        { label: '12:30 PM', value: '12:30' },
        { label: '1:00 PM', value: '13:00' },
        { label: '1:30 PM', value: '13:30' },
        { label: '2:00 PM', value: '14:00' },
        { label: '2:30 PM', value: '14:30' },
        { label: '3:00 PM', value: '15:00' },
        { label: '3:30 PM', value: '15:30' },
        { label: '4:00 PM', value: '16:00' },
        { label: '4:30 PM', value: '16:30' },
        { label: '5:00 PM', value: '17:00' },
      ],
    },
    {
      name: 'privacyAccepted',
      label: 'Privacy Policy Accepted',
      type: 'checkbox',
      required: true,
    },
  ],
}
