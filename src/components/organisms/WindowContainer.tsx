import { FC } from 'react'
import { useWindows, OpenWindow } from '@/context/WindowContext'

import AboutWindow from '@/components/templates/AboutWindow'
import SkillsWindow from '@/components/templates/SkillsWindow'
import ProjectsWindow from '@/components/templates/ProjectsWindow'
import ExperienceWindow from '@/components/templates/ExperiencesWindow'
import ContactWindow from '@/components/templates/ContactWindow'
import ControlType from '@/enums/ControlType'
import Window from '@/components/molecules/Window'

const WindowContainer: FC<{ windowData: OpenWindow }> = ({ windowData }) => {
  const { closeWindow, minimizeWindow, restoreWindow, focusWindow } =
    useWindows()

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

  return (
    <Window
      title={windowData.title}
      controls={[ControlType.MINIMIZE, ControlType.MAXIMIZE, ControlType.CLOSE]}
      controlHandlers={controlHandlers}
      className='o_Window__desktop'
    >
      {getContent(windowData.contentKey)}
    </Window>
  )
}

export default WindowContainer
