import { redirect } from 'next/navigation'
import { i18nConfig } from '@/utils/i18n/i18n'

const RootPage = () => {
  const defaultLocale = i18nConfig.defaultLocale

  redirect(`/${defaultLocale}`)
}

export default RootPage
