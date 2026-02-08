'use client'

import { useState, useRef } from 'react'
import { submitContactForm } from '@/app/(frontend)/[locale]/contact/actions'
import type { Dictionary } from '@/i18n/dictionaries'

export function ContactModal({ dict }: { dict: Dictionary['contact'] }) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  async function handleSubmit(formData: FormData) {
    const result = await submitContactForm(formData)
    if (result.success) {
      setStatus('success')
      formRef.current?.reset()
    } else {
      setStatus('error')
    }
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}>
        {dict.title}
      </button>
    )
  }

  return (
    <div
      style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false)
          setStatus('idle')
        }
      }}
    >
      <div style={{ padding: '32px', minWidth: '500px', border: '1px solid #ccc' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>{dict.title}</h2>
          <button onClick={() => { setOpen(false); setStatus('idle') }}>X</button>
        </div>
        <p>{dict.subtitle}</p>

        {status === 'success' ? (
          <p>{dict.success}</p>
        ) : (
          <form ref={formRef} action={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label>{dict.fullName}*</label>
                <input name="fullName" required placeholder={dict.fullNamePlaceholder} style={{ width: '100%' }} />
              </div>
              <div>
                <label>{dict.email}*</label>
                <input name="email" type="email" required placeholder={dict.emailPlaceholder} style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <label>{dict.companyName}*</label>
              <input name="companyName" required placeholder={dict.companyNamePlaceholder} style={{ width: '100%' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label>{dict.phoneNumber}</label>
                <input name="phoneNumber" type="tel" required placeholder="+123" style={{ width: '100%' }} />
              </div>
              <div>
                <label>{dict.preferredDate}</label>
                <input name="preferredDate" type="date" required style={{ width: '100%' }} />
              </div>
            </div>
            <div>
              <label>{dict.preferredTime}</label>
              <select name="preferredTime" required style={{ width: '100%' }}>
                <option value="">{dict.preferredTimePlaceholder}</option>
                <option value="09:00">9:00 AM</option>
                <option value="09:30">9:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="13:30">1:30 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="14:30">2:30 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="15:30">3:30 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="16:30">4:30 PM</option>
                <option value="17:00">5:00 PM</option>
              </select>
            </div>
            <div>
              <label>
                <input name="privacyAccepted" type="checkbox" required />
                {dict.privacy}
              </label>
            </div>
            {status === 'error' && <p>Error submitting form</p>}
            <button type="submit">{dict.send}</button>
          </form>
        )}
      </div>
    </div>
  )
}
