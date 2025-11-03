'use client'

import { useState } from 'react'

import Desktop from '@/components/pages/Desktop'
import TaskBar from '@/components/organisms/TaskBar'
import Login from '@/components/pages/Login'

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState('Visitor')

  const handleLoginSuccess = (user: string) => {
    setUsername(user)
    setIsLoggedIn(true)
  }

  return (
    <main>
      {isLoggedIn ? (
        <>
          <Desktop username={username} />
          <TaskBar />
        </>
      ) : (
        <Login onLoginSuccess={handleLoginSuccess} />
      )}
    </main>
  )
}
