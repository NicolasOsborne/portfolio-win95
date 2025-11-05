import { redirect } from 'next/navigation'
import { i18nConfig } from '@/utils/i18n/i18n'

export default function RootPage() {
  redirect(`/${i18nConfig.defaultLocale}`)
}
