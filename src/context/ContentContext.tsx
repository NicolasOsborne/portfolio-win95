'use client'

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  FC,
  ReactNode,
} from 'react'
import { usePathname } from 'next/navigation'
import { Content, Locale } from '@/types/contentType'
import { getContent, i18nConfig } from '@/utils/i18n/i18n'

type ContentContextType = {
  content: Content
  locale: Locale
  setLocale: (locale: Locale) => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

type ContentProviderProps = {
  children: ReactNode
  initialLocale: Locale
}

const ContentProvider: FC<ContentProviderProps> = ({
  children,
  initialLocale,
}) => {
  const pathname = usePathname()
  const [locale, setLocale] = useState<Locale>(initialLocale)
  const [content, setContent] = useState<Content>(() =>
    getContent(initialLocale)
  )

  useEffect(() => {
    const match = pathname.match(/^\/(en|fr)/)
    const urlLocale = (match?.[1] as Locale) || i18nConfig.defaultLocale

    if (urlLocale !== locale) {
      setLocale(urlLocale)
      setContent(getContent(urlLocale))
      document.documentElement.lang = urlLocale
    }
  }, [pathname])

  const value = useMemo(
    () => ({ content, locale, setLocale }),
    [content, locale]
  )

  return (
    <ContentContext.Provider value={value}>{children}</ContentContext.Provider>
  )
}

export default ContentProvider

export const useContent = () => {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  return ctx
}
