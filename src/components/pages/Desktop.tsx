'use client'

import { FC } from 'react'
import TaskBar from '../organisms/TaskBar'

import { useWindows, WindowsProvider } from '@/context/WindowContext'
import WindowContainer from '../organisms/WindowContainer'

export const pageSlug = 'desktop'

const DesktopInner: FC = () => {
  const { openWindows } = useWindows()

  const componentsClass = 'p_Desktop'

  return (
    <div className={componentsClass}>
      <div className={`${componentsClass}_background`}>
        {openWindows.map((window) => (
          <WindowContainer key={window.id} windowData={window} />
        ))}
      </div>
      <TaskBar />
    </div>
  )
}

const Desktop: FC = () => (
  <WindowsProvider>
    <DesktopInner />
  </WindowsProvider>
)

export default Desktop
