'use client'

import { FC, useEffect, useState } from 'react'

export type ClockProps = {
  locale: string
}

const componentsClass = 'a_Clock'

const Clock: FC<ClockProps> = ({ locale }) => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formattedTime = time.toLocaleTimeString(
    locale === 'fr' ? 'fr-FR' : 'en-US',
    {
      hour: '2-digit',
      minute: '2-digit',
      hour12: locale === 'en',
    }
  )

  return <div className={componentsClass}>{formattedTime}</div>
}

export default Clock
