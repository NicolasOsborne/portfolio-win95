'use client'

import { FC } from 'react'
import TaskBar from '../organisms/TaskBar'

export const pageSlug = 'desktop'

const Desktop: FC = (props) => {
  const { initialLocale } = props

  const componentsClass = 'p_Desktop'

  return (
    <div className={componentsClass}>
      <TaskBar />
    </div>
  )
}

export default Desktop
