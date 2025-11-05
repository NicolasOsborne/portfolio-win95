import { FC, ReactNode } from 'react'
import TitleBar from '@/components/molecules/TitleBar'
import ControlType from '@/enums/ControlType'

export type WindowProps = {
  title: string
  icon: string
  children: ReactNode
  controls?: ControlType[]
  controlHandlers?: Record<ControlType, () => void>
  className?: string
  onDragStart?: (e: React.MouseEvent) => void
  isFocused?: boolean
}

const Window: FC<WindowProps> = ({
  title,
  icon,
  children,
  controls,
  controlHandlers,
  className = '',
  onDragStart,
  isFocused,
}) => {
  const componentsClass = 'o_Window'

  const defaultControls = [ControlType.CLOSE]

  return (
    <div className={`${componentsClass} ${className}`}>
      <TitleBar
        title={title}
        icon={icon}
        controls={controls ?? defaultControls}
        controlHandlers={controlHandlers}
        onMouseDown={onDragStart}
        isFocused={isFocused}
      />
      <div className={`${componentsClass}_content`}>{children}</div>
    </div>
  )
}

export default Window
