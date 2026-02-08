import Link from 'next/link'
import { getFAQs } from '@/lib/payload'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import { RichText } from '@/components/RichText'

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const faqs = await getFAQs()

  // Group FAQs by category
  const grouped = faqs.reduce(
    (acc, faq) => {
      const category = faq.category || 'General'
      if (!acc[category]) acc[category] = []
      acc[category].push(faq)
      return acc
    },
    {} as Record<string, typeof faqs>,
  )

  return (
    <div style={{ padding: '32px' }}>
      <h1>{dict.faq.title}</h1>
      {Object.keys(grouped).length === 0 && (
        <p>No FAQs yet. Create some in the <Link href="/admin">admin panel</Link>.</p>
      )}
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} style={{ marginBottom: '32px' }}>
          <h2>{category}</h2>
          {items.map((faq) => (
            <details key={faq.id} style={{ marginBottom: '12px', padding: '12px', border: '1px solid #ddd' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                {String(faq[`question_${locale}`] ?? faq.question_en)}
              </summary>
              <div style={{ marginTop: '8px' }}>
                <RichText data={faq[`answer_${locale}`] ?? faq.answer_en} />
              </div>
            </details>
          ))}
        </div>
      ))}
    </div>
  )
}
