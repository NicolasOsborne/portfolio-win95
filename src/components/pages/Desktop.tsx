'use client'

import { FC } from 'react'
import Image from 'next/image'
import TaskBar from '../organisms/TaskBar'

import Background from '@/../public/assets/images/background.svg'
import { useWindows, WindowsProvider } from '@/context/WindowContext'
import WindowContainer from '../organisms/WindowContainer'

export const pageSlug = 'desktop'

const DesktopInner = () => {
  const { openWindows } = useWindows()

  const componentsClass = 'p_Desktop'

  return (
    <div className={componentsClass}>
      <div className={`${componentsClass}_background`}>
        {/* <Image
          className={`${componentsClass}_image`}
          src={Background}
          alt='Nicolas Osborne'
        /> */}
        {openWindows.map((window) => (
          <WindowContainer key={window.id} windowData={window} />
        ))}
      </div>
      <TaskBar />
    </div>
  )
}

const Desktop = () => (
  <WindowsProvider>
    <DesktopInner />
  </WindowsProvider>
)

export default Desktop
