'use client'

import { FC, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { i18nConfig } from '@/utils/i18n/i18n'
import { useContent } from '@/context/ContentContext'

const componentsClass = 'a_LocaleSwitch'

const LocaleSwitch: FC = () => {
  const { locale, setLocale } = useContent()
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname() ?? '/'

  const toggleOpen = () => setOpen(!open)

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return
    setLocale(newLocale as typeof locale)
    const newPath = pathname.replace(/^\/(en|fr)/, `/${newLocale}`)
    router.push(newPath)
    setOpen(false)
  }

  return (
    <div className={componentsClass}>
      <button onClick={toggleOpen} className={`${componentsClass}_button`}>
        {locale.toUpperCase()}
      </button>
      {open && (
        <div className={`${componentsClass}_dropdown`}>
          {i18nConfig.locales.map((l) => (
            <button
              key={l}
              className={`${componentsClass}_choice`}
              onClick={() => switchLocale(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LocaleSwitch
