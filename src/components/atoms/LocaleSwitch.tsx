'use client'

import { FC, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { i18nConfig } from '@/utils/i18n/i18n'

const componentsClass = 'a_LocaleSwitch'

const LocaleSwitch: FC<{ currentLocale: string }> = ({ currentLocale }) => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname() ?? '/'

  const toggleOpen = () => setOpen(!open)

  const switchLocale = (newLocale: string) => {
    if (newLocale === currentLocale) return
    const newPath = pathname.replace(/^\/(en|fr)/, `/${newLocale}`)
    router.push(newPath)
    setOpen(false)
  }

  return (
    <div className={componentsClass}>
      <button onClick={toggleOpen} className={`${componentsClass}_button`}>
        {currentLocale.toUpperCase()}
      </button>
      {open && (
        <div className={`${componentsClass}_dropdown`}>
          {i18nConfig.locales.map((locale) => (
            <button
              key={locale}
              className={`${componentsClass}_choice`}
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
