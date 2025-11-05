import { FC } from 'react'
import Controls from './Controls'
import ControlType from '@/enums/ControlType'
import Image from 'next/image'

export type TitleBarProps = {
  title: string
  icon: string
  controls?: ControlType[]
  controlHandlers?: Record<ControlType, () => void>
  onMouseDown?: (e: React.MouseEvent) => void
}

const TitleBar: FC<TitleBarProps> = ({
  title,
  icon,
  controls,
  controlHandlers,
  onMouseDown,
}) => {
  const componentsClass = 'm_TitleBar'

  return (
    <div
      className={componentsClass}
      onMouseDown={onMouseDown}
      role='toolbar'
      aria-label={`Drag ${title} window`}
    >
      <span className={`${componentsClass}_title`}>
        <Image src={icon} alt={title} width={16} height={16} />
        {title}
      </span>
      {controls && (
        <Controls controls={controls} controlHandlers={controlHandlers} />
      )}
    </div>
  )
}

export default TitleBar
