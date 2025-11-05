'use client'

import { FC, useState } from 'react'
import Button from '../atoms/Button'
import Image from 'next/image'
import Start from '@/../public/assets/win95/icons/menu/start.svg'
import LocaleSwitch from '../atoms/LocaleSwitch'
import Clock from '../atoms/Clock'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'
import Menu from '../molecules/Menu'
import { useContent } from '@/context/ContentContext'
import { useAuth } from '@/context/AuthContext'
import { useWindows } from '@/context/WindowContext'

export type TaskBarProps = {
  list?: { label: string; path: string }[]
}

const TaskBar: FC<TaskBarProps> = ({ list }) => {
  const currentLocale = useCurrentLocale()
  const { content } = useContent()
  const { logout } = useAuth()
  const { openWindow } = useWindows()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const componentsClass = 'o_TaskBar'

  return (
    <div className={componentsClass}>
      <Button
        type='button'
        disabled={false}
        className={`${componentsClass}_start`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Image
          src={Start}
          alt={content.desktop.menu.title}
          width={20}
          height={20}
          draggable={false}
        />
        {content.desktop.menu.title}
      </Button>

      {isMenuOpen && (
        <Menu
          entries={content.desktop.menu.list}
          logoutLabel={content.desktop.logout}
          onLogout={() => {
            setIsMenuOpen(false)
            logout()
          }}
          onItemClick={(key) => {
            const entry = content.desktop.menu.list.find(
              (e) => e.contentKey === key
            )
            if (entry) openWindow(entry.contentKey, entry.label)
            setIsMenuOpen(false)
          }}
        />
      )}

      <div className={`${componentsClass}_tasks`}>{/* task buttons */}</div>

      <div className={`${componentsClass}_right`}>
        <LocaleSwitch currentLocale={currentLocale} />
        <Clock locale={currentLocale} />
      </div>
    </div>
  )
}

export default TaskBar
