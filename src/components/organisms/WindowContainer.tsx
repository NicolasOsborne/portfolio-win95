import { FC, useRef, useState } from 'react'
import { useWindows, OpenWindow } from '@/context/WindowContext'

import AboutWindow from '@/components/templates/AboutWindow'
import SkillsWindow from '@/components/templates/SkillsWindow'
import ProjectsWindow from '@/components/templates/ProjectsWindow'
import ExperienceWindow from '@/components/templates/ExperiencesWindow'
import ContactWindow from '@/components/templates/ContactWindow'
import ControlType from '@/enums/ControlType'
import Window from '@/components/molecules/Window'

const WindowContainer: FC<{ windowData: OpenWindow }> = ({ windowData }) => {
  const {
    closeWindow,
    minimizeWindow,
    restoreWindow,
    focusWindow,
    moveWindow,
  } = useWindows()

  const draggingRef = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return

    focusWindow(windowData.id)
    draggingRef.current = true
    dragOffset.current = {
      x: e.clientX - windowData.x,
      y: e.clientY - windowData.y,
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return
    moveWindow(
      windowData.id,
      e.clientX - dragOffset.current.x,
      e.clientY - dragOffset.current.y
    )
  }

  const handleMouseUp = () => {
    draggingRef.current = false
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const getContent = (key: string) => {
    switch (key) {
      case 'about':
        return <AboutWindow />
      case 'skills':
        return <SkillsWindow />
      case 'projects':
        return <ProjectsWindow />
      case 'experience':
        return <ExperienceWindow />
      case 'contact':
        return <ContactWindow />
      default:
        return null
    }
  }

  const controlHandlers = {
    [ControlType.CLOSE]: () => closeWindow(windowData.id),
    [ControlType.MINIMIZE]: () => minimizeWindow(windowData.id),
    [ControlType.RESTORE]: () => restoreWindow(windowData.id),
    [ControlType.MAXIMIZE]: () => undefined,
    [ControlType.HELP]: () => undefined,
  }

  const childClass = 'o_Window'

  return (
    <div
      style={{
        position: 'absolute',
        top: windowData.y,
        left: windowData.x,
        zIndex: windowData.zIndex,
      }}
      onMouseDown={() => focusWindow(windowData.id)}
      role='toolbar'
      aria-label={`${windowData.title} window`}
    >
      <Window
        title={windowData.title}
        icon={windowData.icon}
        controls={[
          ControlType.MINIMIZE,
          ControlType.MAXIMIZE,
          ControlType.CLOSE,
        ]}
        controlHandlers={controlHandlers}
        className={`${childClass}_desktop`}
        onDragStart={handleMouseDown}
        isFocused={windowData.isFocused}
      >
        {getContent(windowData.contentKey)}
      </Window>
    </div>
  )
}

export default WindowContainer
