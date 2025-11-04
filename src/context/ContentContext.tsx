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

type ContentContextType = {
  content: Content
  locale: Locale
  setLocale: (locale: Locale) => void
  updateContent: (newContent: Content) => void
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

  const updateContent = (newContent: Content) => {
    setContent(newContent)
  }

  const value = useMemo(
    () => ({ content, locale, setLocale, updateContent }),
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
