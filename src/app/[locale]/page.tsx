import { getContent, i18nConfig } from '@/utils/i18n/i18n'
import { Locale } from '@/types/contentType'
import Home from '@/components/pages/Home'

type HomePageProps = {
  params: { locale: Locale }
}

export default async function HomePage({ params }: Readonly<HomePageProps>) {
  const { locale } = params
  const initialLocale = (locale as Locale) || i18nConfig.defaultLocale
  const content = await getContent(initialLocale)

  return <Home serverContent={content} initialLocale={initialLocale} />
}
