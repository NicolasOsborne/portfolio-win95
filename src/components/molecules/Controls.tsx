import { FC } from 'react'
import Control from '@/components/atoms/Control'
import ControlType from '@/enums/ControlType'

export type ControlsProps = {
  controls: ControlType[]
}

const Controls: FC<ControlsProps> = ({ controls }) => {
  const componentsClass = 'm_Controls'

  return (
    <div className={componentsClass}>
      {controls.map((type) => (
        <Control key={type} type={type} />
      ))}
    </div>
  )
}

export default Controls
