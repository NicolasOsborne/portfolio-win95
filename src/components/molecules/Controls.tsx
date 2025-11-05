import { FC } from 'react'
import Control from '@/components/atoms/Control'
import ControlType from '@/enums/ControlType'

export type ControlsProps = {
  controls: ControlType[]
  controlHandlers?: Record<ControlType, () => void>
}

const Controls: FC<ControlsProps> = ({ controls, controlHandlers = {} }) => {
  const componentsClass = 'm_Controls'

  return (
    <div className={componentsClass}>
      {controls.map((type) => (
        <Control key={type} type={type} onClick={controlHandlers[type]} />
      ))}
    </div>
  )
}

export default Controls
