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
      <button onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
        {dict.title}
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setOpen(false)
          setStatus('idle')
        }
      }}
    >
      <div style={{ background: 'white', padding: '32px', minWidth: '400px', color: '#000' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <h2>{dict.title}</h2>
          <button onClick={() => { setOpen(false); setStatus('idle') }} style={{ cursor: 'pointer' }}>
            X
          </button>
        </div>

        {status === 'success' ? (
          <p>{dict.success}</p>
        ) : (
          <form ref={formRef} action={handleSubmit}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>{dict.name}</label>
              <input name="name" required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>{dict.email}</label>
              <input name="email" type="email" required style={{ width: '100%', padding: '8px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px' }}>{dict.message}</label>
              <textarea name="message" required rows={4} style={{ width: '100%', padding: '8px' }} />
            </div>
            {status === 'error' && <p style={{ color: 'red' }}>Error submitting form</p>}
            <button type="submit" style={{ padding: '8px 24px', cursor: 'pointer' }}>
              {dict.send}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
