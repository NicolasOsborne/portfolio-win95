import { FC } from 'react'
import Image from 'next/image'
import { OpenWindow } from '@/context/WindowContext'
import classNames from 'classnames'

export type TaskItemProps = {
  windowData: OpenWindow
  isFocused?: boolean
  onClick?: () => void
}

const TaskItem: FC<TaskItemProps> = ({ windowData, isFocused, onClick }) => {
  const componentsClass = 'a_TaskItem'

  return (
    <button
      type='button'
      disabled={false}
      className={classNames(componentsClass, {
        [`${componentsClass}_focused`]: isFocused,
      })}
      onClick={onClick}
      title={windowData.title}
    >
      <Image
        src={windowData.icon}
        alt={windowData.title}
        width={16}
        height={16}
      />
      <span>{windowData.title}</span>
    </button>
  )
}

export default TaskItem
