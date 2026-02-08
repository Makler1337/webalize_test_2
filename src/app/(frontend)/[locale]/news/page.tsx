import Link from 'next/link'
import { getNews } from '@/lib/payload'
import { getDictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/config'

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const dict = getDictionary(locale)
  const news = await getNews(locale)

  return (
    <div style={{ padding: '32px' }}>
      <h1>{dict.news.title}</h1>
      {news.length === 0 && <p>No news articles yet. Create some in the <Link href="/admin">admin panel</Link>.</p>}
      <div>
        {news.map((article) => (
          <article key={article.id} style={{ marginBottom: '24px', padding: '16px', border: '1px solid #ddd' }}>
            <h2>
              <Link href={`/${locale}/news/${article.slug}`}>
                {article.title}
              </Link>
            </h2>
            {article.excerpt && <p>{article.excerpt}</p>}
            {article.category && <span>Category: {article.category}</span>}
            {article.publishedDate && (
              <p style={{ color: '#666' }}>
                {new Date(article.publishedDate).toLocaleDateString(locale)}
              </p>
            )}
            <Link href={`/${locale}/news/${article.slug}`}>
              {dict.news.readMore} →
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
