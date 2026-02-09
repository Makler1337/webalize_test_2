'use server'

import { createContactSubmission } from '@/lib/payload'

export async function submitContactForm(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const companyName = formData.get('companyName') as string
  const phoneNumber = formData.get('phoneNumber') as string
  const preferredDate = formData.get('preferredDate') as string
  const preferredTime = formData.get('preferredTime') as string
  const privacyAccepted = formData.get('privacyAccepted') === 'on'

  if (!fullName || !email || !companyName || !phoneNumber || !preferredDate || !preferredTime || !privacyAccepted) {
    return { success: false, error: 'All fields are required' }
  }

  try {
    await createContactSubmission({ fullName, email, companyName, phoneNumber, preferredDate, preferredTime, privacyAccepted })
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to submit form' }
  }
}
