import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNewsBySlug, getNews } from '@/lib/payload'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import { RichText } from '@/components/RichText'

const readTimeLabels: Record<string, string> = {
  '5min': '5 min',
  '10min': '10 min',
  '30min': '30 min',
  '1hour': '1 hour',
  '2hours': '2 hours',
}

export default async function NewsPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const dict = getDictionary(locale)
  const article = await getNewsBySlug(slug)

  if (!article) {
    notFound()
  }

  const title = String(article[`title_${locale}`] ?? article.title_en)
  const content = article[`content_${locale}`] ?? article.content_en

  const allNews = await getNews()
  const relatedNews = allNews.filter((n) => n.id !== article.id).slice(0, 3)

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <Link href={`/${locale}/news`}>← {dict.nav.news}</Link>

      <p style={{ color: '#666', marginTop: '16px' }}>
        {article.publishedDate && new Date(article.publishedDate).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })}
        {article.readTime && ` – ${readTimeLabels[article.readTime] ?? article.readTime}`}
      </p>

      <h1 style={{ marginTop: '8px' }}>{title}</h1>

      {article.image && typeof article.image === 'object' && article.image.url && (
        <img
          src={article.image.url}
          alt={article.image.alt}
          style={{ width: '100%', borderRadius: '12px', marginTop: '24px' }}
        />
      )}

      <div style={{ marginTop: '24px' }}>
        {content && <RichText data={content} />}
      </div>

      {relatedNews.length > 0 && (
        <div style={{ marginTop: '48px', borderTop: '1px solid #ddd', paddingTop: '24px' }}>
          <h2>{dict.news.relatedPosts}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {relatedNews.map((related) => (
              <Link key={related.id} href={`/${locale}/news/${related.slug}`} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid #ddd', borderRadius: '12px', overflow: 'hidden' }}>
                {related.image && typeof related.image === 'object' && related.image.url && (
                  <img src={related.image.url} alt={related.image.alt} style={{ width: '100%', height: '120px', objectFit: 'cover' }} />
                )}
                <div style={{ padding: '12px' }}>
                  <p style={{ fontWeight: 'bold' }}>{String(related[`title_${locale}`] ?? related.title_en)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
