'use client'

import { FC } from 'react'

export type DesktopProps = {
  username: string
}

const Desktop: FC<DesktopProps> = (props) => {
  const { username } = props

  const componentsClass = 'p_Desktop'

  return (
    <div
      className={`${componentsClass} flex-1 p-2`}
      style={{
        backgroundImage:
          'repeating-linear-gradient(45deg, #000080 0, #000080 1px, transparent 0, transparent 50%)',
        backgroundSize: '4px 4px',
      }}
    >
      <h1 className='text-white text-lg drop-shadow-lg mb-4'>
        Welcome, {username}!
      </h1>

      <div className='text-white text-sm'>
        Click the **Start** button on the TaskBar when available.
      </div>
    </div>
  )
}

export default Desktop
