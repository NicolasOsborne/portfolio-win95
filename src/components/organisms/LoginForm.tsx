'use client'

import { FC, useState } from 'react'
import Button from '@/components/atoms/Button'
import Window from '@/components/organisms/Window'

export type LoginFormProps = {
  onLoginSuccess: (username: string) => void
}

const LoginForm: FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const componentsClass = 'o_LoginForm'

  const [username, setUsername] = useState('Visitor')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Temporary Client-Side Auth Logic
    if (username === 'Visitor' && password === 'password') {
      onLoginSuccess(username)
    } else {
      setError('Logon Failure: Unknown user name or bad password.')
    }
  }

  return (
    <div className={componentsClass}>
      <Window title='Welcome to Nicoo Portfolio' controls={null}>
        <div className={`${componentsClass}_window`}>
          <div className={`${componentsClass}_icon`}></div>
          <form onSubmit={handleLogin} className={`${componentsClass}_form`}>
            <p className={`${componentsClass}_title`}>
              Type a user name and password to log on to the system.
            </p>
            <div className={`${componentsClass}_fields`}>
              <label className={`${componentsClass}_row`}>
                <span className={`${componentsClass}_label`}>User name:</span>
                <input
                  type='text'
                  className={`${componentsClass}_input`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                />
              </label>
              <label className={`${componentsClass}_row`}>
                <span className={`${componentsClass}_label`}>Password:</span>
                <input
                  type='password'
                  className={`${componentsClass}_input`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>

            {error && <p className='error'>{error}</p>}

            <div className={`${componentsClass}_buttons`}>
              <Button type='submit'>OK</Button>
              <Button type='button'>Cancel</Button>
            </div>
          </form>
        </div>
      </Window>
    </div>
  )
}

export default LoginForm
