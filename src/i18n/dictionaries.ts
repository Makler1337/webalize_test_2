import type { Locale } from './config'

const dictionaries = {
  en: {
    common: {
      missingTranslation: 'missing translation',
    },
    nav: {
      home: 'Home',
      news: 'News',
      faq: 'FAQ',
      integrations: 'Integrations',
      contact: 'Contact',
    },
    news: {
      title: 'Latest news from the industry',
      readMore: 'Read article',
      otherPosts: 'Read more news',
    },
    faq: {
      title: 'Frequently Asked Questions',
    },
    integrations: {
      title: 'Integrations',
      subtitle: 'Company is your API infrastructure, powering your business.',
    },
    contact: {
      title: 'Book a Call',
      subtitle:
        'Please let us know of your most convenient time and our team will get back to you shortly!',
      fullName: 'Full name',
      fullNamePlaceholder: 'Enter your full name',
      email: 'Email',
      emailPlaceholder: 'Enter your email',
      companyName: 'Company name',
      companyNamePlaceholder: 'Enter your company name',
      phoneNumber: 'Phone Number',
      preferredDate: 'Preferred time to receive a call',
      preferredTime: 'Preferred time',
      preferredTimePlaceholder: 'Select preferred time',
      privacy: 'I accept privacy policy',
      send: 'Book a Call',
      success: 'Your call has been booked successfully!',
    },
  },
  de: {
    common: {
      missingTranslation: 'fehlende Übersetzung',
    },
    nav: {
      home: 'Startseite',
      news: 'Nachrichten',
      faq: 'FAQ',
      integrations: 'Integrationen',
      contact: 'Kontakt',
    },
    news: {
      title: 'Neueste Nachrichten aus der Branche',
      readMore: 'Artikel lesen',
      otherPosts: 'Weitere Nachrichten',
    },
    faq: {
      title: 'Haeufig gestellte Fragen',
    },
    integrations: {
      title: 'Integrationen',
      subtitle: 'Unternehmen ist Ihre API-Infrastruktur fuer Ihr Geschaeft.',
    },
    contact: {
      title: 'Anruf buchen',
      subtitle:
        'Bitte teilen Sie uns Ihre bevorzugte Zeit mit und unser Team wird sich in Kuerze bei Ihnen melden!',
      fullName: 'Vollstaendiger Name',
      fullNamePlaceholder: 'Geben Sie Ihren vollstaendigen Namen ein',
      email: 'E-Mail',
      emailPlaceholder: 'Geben Sie Ihre E-Mail ein',
      companyName: 'Firmenname',
      companyNamePlaceholder: 'Geben Sie Ihren Firmennamen ein',
      phoneNumber: 'Telefonnummer',
      preferredDate: 'Bevorzugter Termin',
      preferredTime: 'Bevorzugte Uhrzeit',
      preferredTimePlaceholder: 'Uhrzeit waehlen',
      privacy: 'Ich akzeptiere die Datenschutzrichtlinie',
      send: 'Anruf buchen',
      success: 'Ihr Anruf wurde erfolgreich gebucht!',
    },
  },
}

export type Dictionary = typeof dictionaries.en

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}
