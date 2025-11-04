'use client'

import { FC } from 'react'
import TaskBar from '../organisms/TaskBar'

export const pageSlug = 'desktop'

export type DesktopPageProps = {
  username: string
}

const Desktop: FC<DesktopPageProps> = (props) => {
  const { username } = props

  const componentsClass = 'p_Desktop'

  return (
    <div className={componentsClass}>
      <TaskBar />
    </div>
  )
}

export default Desktop
