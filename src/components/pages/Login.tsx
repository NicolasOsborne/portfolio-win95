'use client'

import { FC } from 'react'
import LoginForm from '@/components/organisms/LoginForm'

export const pageSlug = 'login'

const Login: FC = () => {
  const componentsClass = 'p_Login'

  return (
    <div className={componentsClass}>
      <LoginForm />
    </div>
  )
}

export default Login
