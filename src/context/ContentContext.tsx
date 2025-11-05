'use client'

import {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
  FC,
  ReactNode,
} from 'react'
import { Content, Locale } from '@/types/contentType'
import { getContent } from '@/utils/i18n/i18n'

type ContentContextType = {
  content: Content
  locale: Locale
  setLocale: (locale: Locale) => void
}

const ContentContext = createContext<ContentContextType | undefined>(undefined)

type ContentProviderProps = {
  children: ReactNode
  initialContent: Content
  initialLocale: Locale
}

const ContentProvider: FC<ContentProviderProps> = ({
  children,
  initialContent,
  initialLocale,
}) => {
  const [content, setContent] = useState<Content>(initialContent)
  const [locale, setLocale] = useState<Locale>(initialLocale)

  useEffect(() => {
    const fetchContent = async () => {
      const newContent = await getContent(locale)
      setContent(newContent)
      document.documentElement.lang = locale
    }
    fetchContent()
  }, [locale])

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
