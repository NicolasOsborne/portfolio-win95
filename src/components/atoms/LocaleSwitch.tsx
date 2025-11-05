'use client'

import { FC, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { i18nConfig } from '@/utils/i18n/i18n'

export type LocaleSwitchProps = {
  currentLocale: string
}

const componentsClass = 'a_LocaleSwitch'

const LocaleSwitch: FC<LocaleSwitchProps> = ({ currentLocale }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname() ?? '/'
  const searchParams = useSearchParams() ?? new URLSearchParams()

  const toggleOpen = () => setOpen(!open)

  const switchLocale = (locale: string) => {
    if (locale === currentLocale) return
    const query = searchParams.toString()
    router.push(
      `/${locale}${pathname.replace(/^\/(en|fr)/, '')}${
        query ? `?${query}` : ''
      }`
    )
    setOpen(false)
  }

  return (
    <div className={componentsClass}>
      <button onClick={toggleOpen} className={`${componentsClass}_button`}>
        {currentLocale?.toUpperCase() || i18nConfig.defaultLocale.toUpperCase()}
      </button>
      {open && (
        <div className={`${componentsClass}_dropdown`}>
          {i18nConfig.locales.map((locale) => (
            <button
              className={`${componentsClass}_choice`}
              key={locale}
              onClick={() => switchLocale(locale)}
            >
              {locale.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocaleSwitch
