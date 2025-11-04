import { Content, Locale } from '@/types/contentType'
import { contentEn } from '../../../locales/en.content'
import { contentFr } from '../../../locales/fr.content'

const contentMap: Record<Locale, Content> = {
  en: contentEn,
  fr: contentFr,
}

export const i18nConfig = {
  locales: ['en', 'fr'] as Locale[],
  defaultLocale: 'fr' as Locale,
}

function isValidLocale(locale: string): locale is Locale {
  return i18nConfig.locales.includes(locale as Locale)
}

export async function getContent(locale: Locale): Promise<Content> {
  const localeString = String(locale)
  let resolvedLocale: Locale = i18nConfig.defaultLocale

  if (isValidLocale(localeString)) {
    resolvedLocale = locale
  } else {
    console.warn(
      `Locale "${localeString}" not found or invalid. Falling back to default locale: ${i18nConfig.defaultLocale}`
    )
  }

  return contentMap[resolvedLocale]
}
