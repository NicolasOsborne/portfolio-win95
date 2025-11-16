import { FC } from 'react'
import { useWindows } from '@/context/WindowContext'
import TaskItem from '@/components/atoms/TaskItem'

const TaskList: FC = () => {
  const { openWindows, focusWindow, restoreWindow, minimizeWindow } =
    useWindows()

  const componentsClass = 'm_TaskList'

  return (
    <div className={componentsClass}>
      {openWindows.map((window) => (
        <TaskItem
          key={window.id}
          windowData={window}
          isFocused={window.isFocused}
          onClick={() => {
            if (window.isMinimized) {
              restoreWindow(window.id)
              focusWindow(window.id)
            } else if (window.isFocused) {
              minimizeWindow(window.id)
            } else {
              focusWindow(window.id)
            }
          }}
        />
      ))}
    </div>
  )
}

export default TaskList
