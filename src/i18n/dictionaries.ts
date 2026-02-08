import type { Locale } from './config'

const dictionaries = {
  en: {
    nav: {
      home: 'Home',
      news: 'News',
      faq: 'FAQ',
      integrations: 'Integrations',
      contact: 'Contact',
    },
    news: {
      title: 'Latest news from the industry',
      readMore: 'Read more',
      relatedPosts: 'Related news',
    },
    faq: {
      title: 'Frequently Asked Questions',
    },
    integrations: {
      title: 'Integrations',
      subtitle: 'Company is your API infrastructure, powering your business.',
    },
    contact: {
      title: 'Contact us',
      name: 'Name',
      email: 'Email',
      message: 'Message',
      send: 'Send',
      success: 'Message sent successfully!',
    },
  },
  cs: {
    nav: {
      home: 'Domov',
      news: 'Novinky',
      faq: 'FAQ',
      integrations: 'Integrace',
      contact: 'Kontakt',
    },
    news: {
      title: 'Nejnovejsi zpravy z odvetvi',
      readMore: 'Vice',
      relatedPosts: 'Související novinky',
    },
    faq: {
      title: 'Casto kladene otazky',
    },
    integrations: {
      title: 'Integrace',
      subtitle: 'Spolecnost je vase API infrastruktura pro vas business.',
    },
    contact: {
      title: 'Kontaktujte nas',
      name: 'Jmeno',
      email: 'Email',
      message: 'Zprava',
      send: 'Odeslat',
      success: 'Zprava byla uspesne odeslana!',
    },
  },
}

export type Dictionary = typeof dictionaries.en

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
