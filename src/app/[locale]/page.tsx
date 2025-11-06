import { i18nConfig } from '@/utils/i18n/i18n'
import Home from '@/components/pages/Home'
import { Locale } from '@/types/contentType'

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }))
}

export default function HomePage({
  params,
}: Readonly<{ params: { locale: string } }>) {
  const currentLocale: Locale = i18nConfig.locales.includes(
    params.locale as Locale
  )
    ? (params.locale as Locale)
    : i18nConfig.defaultLocale

  return <Home initialLocale={currentLocale} />
}
