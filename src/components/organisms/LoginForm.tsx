'use client'

import { FC, useState } from 'react'
import Button from '@/components/atoms/Button'
import Window from '@/components/molecules/Window'
import { useAuth } from '@/context/AuthContext'
import ControlType from '@/enums/ControlType'
import { useContent } from '@/context/ContentContext'

const LoginForm: FC = () => {
  const { login } = useAuth()
  const { content } = useContent()

  const [username, setUsername] = useState('visitor')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const componentsClass = 'o_LoginForm'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(username, password)

      if (!success) {
        setError(content.login.error)
      }
    } catch (err) {
      console.error('Login failed unexpectedly:', err)
      setError('An unexpected error occurred during login attempt.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={componentsClass}>
      <Window
        title={content.login.title}
        icon={content.login.icon}
        controls={[ControlType.HELP]}
      >
        <div className={`${componentsClass}_window`}>
          <div className={`${componentsClass}_icon`}></div>
          <form onSubmit={handleLogin} className={`${componentsClass}_form`}>
            <div className={`${componentsClass}_content`}>
              <p className={`${componentsClass}_title`}>
                {content.login.prompt}
              </p>
              <div className={`${componentsClass}_fields`}>
                <label className={`${componentsClass}_row`}>
                  <span className={`${componentsClass}_label`}>
                    {content.login.username}
                  </span>
                  <input
                    type='text'
                    className={`${componentsClass}_input`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus
                    disabled={isLoading}
                  />
                </label>
                <label className={`${componentsClass}_row`}>
                  <span className={`${componentsClass}_label`}>
                    {content.login.password}
                  </span>
                  <input
                    type='password'
                    className={`${componentsClass}_input`}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                </label>
              </div>

              {error && <p className='error'>{error}</p>}
            </div>

            <div className={`${componentsClass}_buttons`}>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? '...' : content.login.ok}
              </Button>
              <Button type='button' disabled={isLoading}>
                {content.login.cancel}
              </Button>
            </div>
          </form>
        </div>
      </Window>
    </div>
  )
}

export default LoginForm
