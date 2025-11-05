import { FC } from 'react'
import Controls from './Controls'
import ControlType from '@/enums/ControlType'
import Image from 'next/image'

export type TitleBarProps = {
  title: string
  icon: string
  controls?: ControlType[]
  controlHandlers?: Record<ControlType, () => void>
}

const TitleBar: FC<TitleBarProps> = ({
  title,
  icon,
  controls,
  controlHandlers,
}) => {
  const componentsClass = 'm_TitleBar'

  return (
    <div className={componentsClass}>
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
