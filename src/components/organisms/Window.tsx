import { FC, ReactNode } from 'react'
import TitleBar from '@/components/molecules/TitleBar'

export type WindowProps = {
  title: string
  children: ReactNode
  controls?: ReactNode
  className?: string
}

const Window: FC<WindowProps> = ({
  title,
  children,
  controls,
  className = '',
}) => {
  const componentsClass = 'o_Window'

  const defaultControls = (
    <button className={`${componentsClass}_close`}>X</button>
  )

  return (
    <div className={`${componentsClass} ${className}`}>
      <TitleBar
        title={title}
        controls={controls !== undefined ? controls : defaultControls}
      />
      <div className={`${componentsClass}_content`}>{children}</div>
    </div>
  )
}

export default Window
