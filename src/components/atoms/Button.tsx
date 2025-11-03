import { FC, ButtonHTMLAttributes } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
}

const Button: FC<ButtonProps> = ({ children, className = '', ...props }) => {
  const componentsClass = 'a_Button'

  return (
    <button className={`${componentsClass} ${className}`} {...props}>
      {children}
    </button>
  )
}

export default Button
