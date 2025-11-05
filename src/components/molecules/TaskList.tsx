import { FC } from 'react'
import { useWindows } from '@/context/WindowContext'
import TaskItem from '@/components/atoms/TaskItem'

const TaskList: FC = () => {
  const { openWindows, focusWindow, restoreWindow } = useWindows()

  const componentsClass = 'm_TaskList'

  return (
    <div className={componentsClass}>
      {openWindows.map((window) => (
        <TaskItem
          key={window.id}
          windowData={window}
          isFocused={window.isFocused}
          onClick={() => {
            if (window.minimized) {
              restoreWindow(window.id)
            }
            focusWindow(window.id)
          }}
        />
      ))}
    </div>
  )
}

export default TaskList
