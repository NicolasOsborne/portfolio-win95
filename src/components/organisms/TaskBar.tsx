'use client'

import { FC, useState, useEffect } from 'react'

export type TaskBarProps = {
  list?: { label: string; path: string }[]
}

const TaskBar: FC<TaskBarProps> = (props) => {
  const { list } = props

  const componentsClass = 'o_TaskBar'
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

  return (
    <div
      className={`${componentsClass} fixed bottom-0 left-0 right-0 h-8 bg-[#c0c0c0] border-t-2 border-t-white border-l-white border-r-[#808080] border-b-[#808080] shadow-xl flex items-center justify-between px-1 z-50`}
    >
      <div className='flex items-center space-x-2'>
        <button className='win95-button bg-[#c0c0c0] font-bold h-6 text-sm flex items-center'>
          <span className='mr-1 text-2xl' style={{ color: '#ff0000' }}>
            W
          </span>
          <span className='mr-1'>i</span>
          <span className='mr-1'>n</span>
          <span className='mr-1'>9</span>
          <span className='mr-1'>5</span>
        </button>
        <div className='flex space-x-1'></div>
      </div>

      <div className='flex items-center h-full'>
        <div className='win95-window h-full px-2 py-0.5 border-t-[#808080] border-l-[#808080] border-r-white border-b-white text-xs flex items-center space-x-2'>
          <span className='font-semibold cursor-pointer'>{currentLocale}</span>
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskBar
