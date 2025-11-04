import { FC } from 'react'
import Controls from './Controls'
import ControlType from '@/enums/ControlType'

export type TitleBarProps = {
  title: string
  controls?: ControlType[]
}

const TitleBar: FC<TitleBarProps> = ({ title, controls }) => {
  const componentsClass = 'm_TitleBar'

  return (
    <div className={componentsClass}>
      <span className={`${componentsClass}_title`}>{title}</span>
      {controls && <Controls controls={controls} />}
    </div>
  )
}

export default TitleBar
