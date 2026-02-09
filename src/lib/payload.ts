import { getPayload } from 'payload'
import config from '@/payload.config'
import type { ContactSubmission } from '@/payload-types'

async function getPayloadClient() {
  return getPayload({ config: await config })
}

export async function getNews() {
  const payload = await getPayloadClient()
  const news = await payload.find({
    collection: 'news',
    sort: '-publishedDate',
  })
  return news.docs
}

export async function getNewsBySlug(slug: string) {
  const payload = await getPayloadClient()
  const news = await payload.find({
    collection: 'news',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })
  return news.docs[0] ?? null
}

export async function getFAQs() {
  const payload = await getPayloadClient()
  const faqs = await payload.find({
    collection: 'faq',
    sort: 'order',
    limit: 100,
  })
  return faqs.docs
}

export async function getIntegrations() {
  const payload = await getPayloadClient()
  const integrations = await payload.find({
    collection: 'integrations',
    limit: 100,
  })
  return integrations.docs
}

export async function createContactSubmission(
  data: Pick<
    ContactSubmission,
    | 'fullName'
    | 'email'
    | 'companyName'
    | 'phoneNumber'
    | 'preferredDate'
    | 'preferredTime'
    | 'privacyAccepted'
  >,
) {
  const payload = await getPayloadClient()
  return payload.create({
    collection: 'contact-submissions',
    data,
  })
}
