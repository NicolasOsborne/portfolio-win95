'use client'

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

  const ref = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)
  const dragOffset = useRef({ x: 0, y: 0 })

  const [isAnimating, setIsAnimating] = useState<
    'minimizing' | 'restoring' | null
  >(null)
  const [customTransform, setCustomTransform] = useState<string>('none')
  const [customOpacity, setCustomOpacity] = useState<number>(1)

  // Coordinates for window drag and drop
  const getCoords = (
    event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent
  ) => {
    if ('touches' in event) {
      return {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      }
    }
    return {
      x: event.clientX,
      y: event.clientY,
    }
  }

  // Touch events (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    if (e.touches.length !== 1) return

    focusWindow(windowData.id)
    draggingRef.current = true

    const { x: clientX, y: clientY } = getCoords(e)

    dragOffset.current = {
      x: clientX - windowData.x,
      y: clientY - windowData.y,
    }

    document.addEventListener('touchmove', handleTouchMove)
    document.addEventListener('touchend', handleTouchEnd)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!draggingRef.current) return

    const { x: clientX, y: clientY } = getCoords(e)

    moveWindow(
      windowData.id,
      clientX - dragOffset.current.x,
      clientY - dragOffset.current.y
    )
  }

  const handleTouchEnd = () => {
    draggingRef.current = false
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
  }

  // Mouse events (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return

    focusWindow(windowData.id)
    draggingRef.current = true

    const { x: clientX, y: clientY } = getCoords(e)

    dragOffset.current = {
      x: clientX - windowData.x,
      y: clientY - windowData.y,
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current) return

    const { x: clientX, y: clientY } = getCoords(e)

    moveWindow(
      windowData.id,
      clientX - dragOffset.current.x,
      clientY - dragOffset.current.y
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

  const handleMinimize = () => {
    const taskItem = document.querySelector(
      `[data-window-id="${windowData.id}"]`
    )
    if (!taskItem || !ref.current) {
      minimizeWindow(windowData.id)
      return
    }

    const taskRect = taskItem.getBoundingClientRect()
    const winRect = ref.current.getBoundingClientRect()

    const translateX =
      taskRect.left - winRect.left + taskRect.width / 2 - winRect.width / 2
    const translateY =
      taskRect.top - winRect.top + taskRect.height / 2 - winRect.height / 2

    setCustomTransform(`translate(${translateX}px, ${translateY}px) scale(0.1)`)
    setCustomOpacity(0)
    setIsAnimating('minimizing')

    setTimeout(() => {
      minimizeWindow(windowData.id)
      setIsAnimating(null)
      setCustomTransform('none')
      setCustomOpacity(1)
    }, 250)
  }

  const handleRestore = () => {
    const taskItem = document.querySelector(
      `[data-window-id="${windowData.id}"]`
    )
    if (!taskItem || !ref.current) {
      restoreWindow(windowData.id)
      return
    }

    const taskRect = taskItem.getBoundingClientRect()
    const winRect = ref.current.getBoundingClientRect()

    const translateX =
      taskRect.left - winRect.left + taskRect.width / 2 - winRect.width / 2
    const translateY =
      taskRect.top - winRect.top + taskRect.height / 2 - winRect.height / 2

    setCustomTransform(`translate(${translateX}px, ${translateY}px) scale(0.1)`)
    setCustomOpacity(0)
    setIsAnimating('restoring')

    requestAnimationFrame(() => {
      setCustomTransform('none')
      setCustomOpacity(1)
    })

    setTimeout(() => {
      restoreWindow(windowData.id)
      setIsAnimating(null)
    }, 250)
  }

  const controlHandlers = {
    [ControlType.CLOSE]: () => closeWindow(windowData.id),
    [ControlType.MINIMIZE]: handleMinimize,
    [ControlType.RESTORE]: handleRestore,
    [ControlType.MAXIMIZE]: () => undefined,
    [ControlType.HELP]: () => undefined,
  }

  const childClass = 'o_Window'

  return (
    <>
      {(!windowData.isMinimized || isAnimating) && (
        <div
          ref={ref}
          style={{
            position: 'absolute',
            top: windowData.y,
            left: windowData.x,
            zIndex: windowData.zIndex,
            transform: customTransform,
            transformOrigin: 'bottom left',
            transition:
              'transform 0.25s ease-in-out, opacity 0.25s ease-in-out',
            opacity: customOpacity,
            pointerEvents:
              windowData.isMinimized && !isAnimating ? 'none' : 'auto',
          }}
          onMouseDown={() => focusWindow(windowData.id)}
          onTouchStart={() => focusWindow(windowData.id)}
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
            onTouchStart={handleTouchStart}
            isFocused={windowData.isFocused}
          >
            {getContent(windowData.contentKey)}
          </Window>
        </div>
      )}
    </>
  )
}

export default WindowContainer
