'use client'

import { FC } from 'react'
import { useContent } from '@/context/ContentContext'
import { useWindows } from '@/context/WindowContext'
import DesktopIcon from '../atoms/DesktopIcon'

const DesktopShortcuts: FC = () => {
  const { content } = useContent()
  const { openWindow } = useWindows()

  const list = content.desktop.menu.list

  const componentsClass = 'm_DesktopShortcuts'

  return (
    <div className={componentsClass}>
      {list.map((shortcut) => (
        <DesktopIcon
          key={shortcut.id}
          entry={shortcut}
          onClick={() =>
            openWindow(shortcut.contentKey, shortcut.label, shortcut.icon)
          }
        />
      ))}
    </div>
  )
}

export default DesktopShortcuts
