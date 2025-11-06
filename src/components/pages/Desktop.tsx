'use client'

import { FC } from 'react'

import { useWindows, WindowsProvider } from '@/context/WindowContext'
import { useContent } from '@/context/ContentContext'
import WindowContainer from '../organisms/WindowContainer'
import TaskBar from '../organisms/TaskBar'
import DesktopShortcuts from '../molecules/DesktopShortcuts'
import DesktopIcon from '../atoms/DesktopIcon'

export const pageSlug = 'desktop'

const DesktopInner: FC = () => {
  const { openWindows } = useWindows()
  const { content } = useContent()

  const componentsClass = 'p_Desktop'

  return (
    <div className={componentsClass}>
      <div className={`${componentsClass}_background`}>
        {openWindows.map((window) => (
          <WindowContainer key={window.id} windowData={window} />
        ))}
      </div>
      <TaskBar />
      <DesktopShortcuts />
      <DesktopIcon entry={content.desktop.recycle} isRecycle={true} />
    </div>
  )
}

const Desktop: FC = () => (
  <WindowsProvider>
    <DesktopInner />
  </WindowsProvider>
)

export default Desktop
