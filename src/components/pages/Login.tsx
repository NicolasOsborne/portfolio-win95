'use client'

import { FC } from 'react'
import LoginForm, { LoginFormProps } from '@/components/organisms/LoginForm'

export type LoginProps = LoginFormProps

const Login: FC<LoginProps> = (props) => {
  const componentsClass = 'p_Login'

  return (
    <div className={componentsClass}>
      <LoginForm onLoginSuccess={props.onLoginSuccess} />
    </div>
  )
}

export default Login
