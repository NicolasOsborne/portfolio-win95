import { Content, Locale } from '@/types/contentType'
import { contentEn } from '../../../locales/en.content'
import { contentFr } from '../../../locales/fr.content'

export const i18nConfig = {
  locales: ['en', 'fr'] as Locale[],
  defaultLocale: 'fr' as Locale,
}

const contentMap: Record<Locale, Content> = {
  en: contentEn,
  fr: contentFr,
}

export function getContent(locale: Locale): Content {
  if (i18nConfig.locales.includes(locale)) {
    return contentMap[locale]
  }
  console.warn(
    `Locale "${locale}" not found. Falling back to default (${i18nConfig.defaultLocale})`
  )
  return contentMap[i18nConfig.defaultLocale]
}
