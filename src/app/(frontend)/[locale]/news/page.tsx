import Link from 'next/link'
import { getNews } from '@/lib/payload'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

const readTimeLabels: Record<string, string> = {
  '5min': '5 min',
  '10min': '10 min',
  '30min': '30 min',
  '1hour': '1 hour',
  '2hours': '2 hours',
}

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const news = await getNews()

  return (
    <div style={{ padding: '32px' }}>
      <h1>{dict.news.title}</h1>
      {news.length === 0 && <p>No news articles yet. Create some in the <Link href="/admin">admin panel</Link>.</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {news.map((article) => (
          <article key={article.id} style={{ border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
            {article.image && typeof article.image === 'object' && article.image.url && (
              <img
                src={article.image.url}
                alt={article.image.alt}
                style={{ width: '100%', height: '200px', objectFit: 'cover' }}
              />
            )}
            <div style={{ padding: '16px' }}>
              <p style={{ color: '#666', fontSize: '14px' }}>
                {article.publishedDate && new Date(article.publishedDate).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
                {article.readTime && ` – ${readTimeLabels[article.readTime] ?? article.readTime}`}
              </p>
              <h2 style={{ margin: '8px 0' }}>{String(article[`title_${locale}`] ?? article.title_en)}</h2>
              <p>{String(article[`description_${locale}`] ?? article.description_en)}</p>
              <Link href={`/${locale}/news/${article.slug}`} style={{ display: 'inline-block', marginTop: '12px', padding: '8px 16px', border: '1px solid #333', borderRadius: '20px', textDecoration: 'none', color: 'inherit' }}>
                {dict.news.readMore}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
