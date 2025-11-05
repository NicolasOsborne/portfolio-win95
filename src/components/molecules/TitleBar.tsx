import { FC } from 'react'
import Controls from './Controls'
import ControlType from '@/enums/ControlType'

export type TitleBarProps = {
  title: string
  controls?: ControlType[]
  controlHandlers?: Record<ControlType, () => void>
}

const TitleBar: FC<TitleBarProps> = ({ title, controls, controlHandlers }) => {
  const componentsClass = 'm_TitleBar'

  return (
    <div className={componentsClass}>
      <span className={`${componentsClass}_title`}>{title}</span>
      {controls && (
        <Controls controls={controls} controlHandlers={controlHandlers} />
      )}
    </div>
  )
}

export default TitleBar
