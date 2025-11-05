import { FC, ReactNode } from 'react'
import TitleBar from '@/components/molecules/TitleBar'
import ControlType from '@/enums/ControlType'

export type WindowProps = {
  title: string
  children: ReactNode
  controls?: ControlType[]
  controlHandlers?: Record<ControlType, () => void>
  className?: string
}

const Window: FC<WindowProps> = ({
  title,
  children,
  controls,
  controlHandlers,
  className = '',
}) => {
  const componentsClass = 'o_Window'

  const defaultControls = [ControlType.CLOSE]

  return (
    <div className={`${componentsClass} ${className}`}>
      <TitleBar
        title={title}
        controls={controls ?? defaultControls}
        controlHandlers={controlHandlers}
      />
      <div className={`${componentsClass}_content`}>{children}</div>
    </div>
  )
}

export default Window
