import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getNewsBySlug, getNews } from '@/lib/payload'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'
import { RichText } from '@/components/RichText'

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
    <div style={{ padding: '32px' }}>
      <Link href={`/${locale}/news`}>← {dict.nav.news}</Link>
      <h1 style={{ marginTop: '16px' }}>{title}</h1>
      {article.publishedDate && (
        <p style={{ color: '#666' }}>
          {new Date(article.publishedDate).toLocaleDateString(locale)}
        </p>
      )}
      {article.category && <p>Category: {article.category}</p>}
      {article.image && typeof article.image === 'object' && (
        <p>[Image: {article.image.alt}]</p>
      )}
      <div style={{ marginTop: '24px' }}>
        {content && <RichText data={content} />}
      </div>

      {relatedNews.length > 0 && (
        <div style={{ marginTop: '48px', borderTop: '1px solid #ddd', paddingTop: '24px' }}>
          <h2>{dict.news.relatedPosts}</h2>
          {relatedNews.map((related) => (
            <div key={related.id} style={{ marginBottom: '16px' }}>
              <Link href={`/${locale}/news/${related.slug}`}>
                {String(related[`title_${locale}`] ?? related.title_en)}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
