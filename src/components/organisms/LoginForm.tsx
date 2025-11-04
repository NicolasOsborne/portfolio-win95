'use client'

import { FC, useState } from 'react'
import Button from '@/components/atoms/Button'
import Window from '@/components/organisms/Window'
import { useAuth } from '@/context/AuthContext'

const LoginForm: FC = () => {
  const { login, content } = useAuth()
  const { login: loginContent } = content

  const componentsClass = 'o_LoginForm'

  const [username, setUsername] = useState('Visitor')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const success = await login(username, password)

      if (!success) {
        setError(loginContent.error)
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
      <Window title='Welcome to Nicoo Portfolio' controls={null}>
        <div className={`${componentsClass}_window`}>
          <div className={`${componentsClass}_icon`}></div>
          <form onSubmit={handleLogin} className={`${componentsClass}_form`}>
            <p className={`${componentsClass}_title`}>{loginContent.prompt}</p>
            <div className={`${componentsClass}_fields`}>
              <label className={`${componentsClass}_row`}>
                <span className={`${componentsClass}_label`}>
                  {loginContent.username}
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
                  {loginContent.password}
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

            <div className={`${componentsClass}_buttons`}>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? '...' : loginContent.ok}
              </Button>
              <Button type='button' disabled={isLoading}>
                {loginContent.cancel}
              </Button>
            </div>
          </form>
        </div>
      </Window>
    </div>
  )
}

export default LoginForm
