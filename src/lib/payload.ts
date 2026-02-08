import { getPayload } from 'payload'
import config from '@/payload.config'
import type { Locale } from '@/i18n/config'

async function getPayloadClient() {
  return getPayload({ config: await config })
}

export async function getNews(locale: Locale) {
  const payload = await getPayloadClient()
  const news = await payload.find({
    collection: 'news',
    locale,
    sort: '-publishedDate',
  })
  return news.docs
}

export async function getNewsBySlug(slug: string, locale: Locale) {
  const payload = await getPayloadClient()
  const news = await payload.find({
    collection: 'news',
    locale,
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return news.docs[0] ?? null
}

export async function getFAQs(locale: Locale) {
  const payload = await getPayloadClient()
  const faqs = await payload.find({
    collection: 'faq',
    locale,
    sort: 'order',
    limit: 100,
  })
  return faqs.docs
}

export async function getIntegrations(locale: Locale) {
  const payload = await getPayloadClient()
  const integrations = await payload.find({
    collection: 'integrations',
    locale,
    limit: 100,
  })
  return integrations.docs
}

export async function createContactSubmission(data: {
  name: string
  email: string
  message: string
}) {
  const payload = await getPayloadClient()
  return payload.create({
    collection: 'contact-submissions',
    data,
  })
}
