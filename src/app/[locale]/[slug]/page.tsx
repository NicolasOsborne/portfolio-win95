import { getContent, i18nConfig } from '@/utils/i18n/i18n'
import { Locale } from '@/types/contentType'
import Home from '@/components/pages/Home'
import { Metadata } from 'next'

type PageProps = {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

const Page = async ({ params }: PageProps) => {
  const { locale, slug } = await params

  const initialLocale =
    (locale && (String(locale) as Locale)) || i18nConfig.defaultLocale

  const content = await getContent(initialLocale)

  return (
    <Home
      serverContent={content}
      initialLocale={initialLocale}
      currentSlug={slug}
    />
  )
}
export default Page

export const metadata: Metadata = {
  title: 'Nicoo | Portfolio',
}
