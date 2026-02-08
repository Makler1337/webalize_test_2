'use server'

import { createContactSubmission } from '@/lib/payload'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'All fields are required' }
  }

  try {
    await createContactSubmission({ name, email, message })
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to submit form' }
  }
}
