'use client'

import { FC, useState, useEffect } from 'react'
import Button from '../atoms/Button'
import Image from 'next/image'

import Start from '@/../public/assets/win95/icons/menu/start.svg'

export type TaskBarProps = {
  list?: { label: string; path: string }[]
}

const TaskBar: FC<TaskBarProps> = (props) => {
  const { list } = props

  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  })
  const currentLocale = 'EN'

  const componentsClass = 'o_TaskBar'

  return (
    <div className={componentsClass}>
      <Button
        type='button'
        disabled={false}
        className={`${componentsClass}_start`}
      >
        <Image
          src={Start}
          alt={'Start'}
          width={20}
          height={20}
          draggable={false}
        />
        Start
      </Button>
      <div className={`${componentsClass}_tasks`}></div>
      <div className={`${componentsClass}_right`}>
        <div className={`${componentsClass}_locale`}>{currentLocale}</div>
        <div className={`${componentsClass}_time`}>{formattedTime}</div>
      </div>
    </div>
  )
}

export default TaskBar
