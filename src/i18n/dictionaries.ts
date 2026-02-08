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
  de: {
    nav: {
      home: 'Startseite',
      news: 'Nachrichten',
      faq: 'FAQ',
      integrations: 'Integrationen',
      contact: 'Kontakt',
    },
    news: {
      title: 'Neueste Nachrichten aus der Branche',
      readMore: 'Weiterlesen',
      relatedPosts: 'Verwandte Nachrichten',
    },
    faq: {
      title: 'Haeufig gestellte Fragen',
    },
    integrations: {
      title: 'Integrationen',
      subtitle: 'Unternehmen ist Ihre API-Infrastruktur fuer Ihr Geschaeft.',
    },
    contact: {
      title: 'Kontaktieren Sie uns',
      name: 'Name',
      email: 'E-Mail',
      message: 'Nachricht',
      send: 'Senden',
      success: 'Nachricht erfolgreich gesendet!',
    },
  },
}

export type Dictionary = typeof dictionaries.en

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
