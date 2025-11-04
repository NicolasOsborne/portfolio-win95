'use client'

import { FC } from 'react'
import Button from '../atoms/Button'
import Image from 'next/image'
import Start from '@/../public/assets/win95/icons/menu/start.svg'
import LocaleSwitch from '../atoms/LocaleSwitch'
import Clock from '../atoms/Clock'
import { useCurrentLocale } from '@/hooks/useCurrentLocale'

export type TaskBarProps = {
  list?: { label: string; path: string }[]
}

const TaskBar: FC<TaskBarProps> = ({ list }) => {
  const componentsClass = 'o_TaskBar'
  const currentLocale = useCurrentLocale()

  return (
    <div className={componentsClass}>
      <Button
        type='button'
        disabled={false}
        className={`${componentsClass}_start`}
      >
        <Image
          src={Start}
          alt='Start'
          width={20}
          height={20}
          draggable={false}
        />
        Start
      </Button>

      <div className={`${componentsClass}_tasks`}>{/* task buttons */}</div>

      <div className={`${componentsClass}_right`}>
        <LocaleSwitch currentLocale={currentLocale} />
        <Clock locale={currentLocale} />
      </div>
    </div>
  )
}

export default TaskBar
