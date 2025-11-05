'use client'

import { usePathname } from 'next/navigation'
import { i18nConfig } from '@/utils/i18n/i18n'
import { useMemo } from 'react'

export const useCurrentLocale = (): string => {
  const pathname = usePathname()

  const locale = useMemo(() => {
    const match = pathname?.match(/^\/(en|fr)/)
    return match ? match[1] : i18nConfig.defaultLocale
  }, [pathname])

  return locale
}
