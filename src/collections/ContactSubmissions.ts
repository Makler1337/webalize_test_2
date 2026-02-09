import type { CollectionConfig } from 'payload'
import { timeSlots } from '@/constants/timeSlots'

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
      options: timeSlots.map((slot) => ({ label: slot.label, value: slot.value })),
    },
    {
      name: 'privacyAccepted',
      label: 'Privacy Policy Accepted',
      type: 'checkbox',
      required: true,
    },
  ],
}
