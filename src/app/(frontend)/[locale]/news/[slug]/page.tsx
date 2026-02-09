import Image from 'next/image'
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
  const missingTranslation = dict.common.missingTranslation
  const article = await getNewsBySlug(slug, locale)

  if (!article) {
    notFound()
  }

  const allNews = await getNews(locale)
  const relatedNews = allNews.filter((n) => n.id !== article.id).slice(0, 3)

  return (
    <div style={{ padding: '32px', maxWidth: '800px', margin: '0 auto' }}>
      <Link href={`/${locale}/news`}>← {dict.nav.news}</Link>

      <p style={{ color: '#666', marginTop: '16px' }}>
        {article.publishedDate &&
          new Date(article.publishedDate).toLocaleDateString(locale, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        {article.readTime && ` – ${readTimeLabels[article.readTime] ?? article.readTime}`}
      </p>

      <h1 style={{ marginTop: '8px' }}>{article.title ?? missingTranslation}</h1>

      {article.image && typeof article.image === 'object' && article.image.url && (
        <Image
          src={article.image.url}
          alt={article.image.alt}
          width={800}
          height={400}
          style={{ width: '100%', height: 'auto', marginTop: '24px' }}
        />
      )}

      <div style={{ marginTop: '24px' }}>
        {article.content ? <RichText data={article.content} /> : <p>{missingTranslation}</p>}
      </div>

      {relatedNews.length > 0 && (
        <div style={{ marginTop: '48px', borderTop: '1px solid #ddd', paddingTop: '24px' }}>
          <h2>{dict.news.otherPosts}</h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            {relatedNews.map((related) => (
              <Link
                key={related.id}
                href={`/${locale}/news/${related.slug}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  border: '1px solid #ddd',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}
              >
                {related.image && typeof related.image === 'object' && related.image.url && (
                  <Image
                    src={related.image.url}
                    alt={related.image.alt}
                    width={200}
                    height={120}
                    style={{ width: '100%', height: '120px', objectFit: 'cover' }}
                  />
                )}
                <div style={{ padding: '12px' }}>
                  <p style={{ fontWeight: 'bold' }}>{related.title ?? missingTranslation}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
