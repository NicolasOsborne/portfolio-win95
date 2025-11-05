import { getContent, i18nConfig } from '@/utils/i18n/i18n'
import { Locale } from '@/types/contentType'
import Home from '@/components/pages/Home'

type HomePageProps = {
  params: Promise<{ locale: Locale }>
}

const HomePage = async ({ params }: HomePageProps) => {
  const { locale } = await params

  const initialLocale =
    (locale && (String(locale) as Locale)) || i18nConfig.defaultLocale

  const content = await getContent(initialLocale)
  return <Home serverContent={content} initialLocale={initialLocale} />
}
export default HomePage
