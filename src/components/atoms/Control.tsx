import { FC } from 'react'
import ControlType from '@/enums/ControlType'
import Image from 'next/image'
import ControlIcon from '@/enums/ControlIcon'

export type ControlProps = {
  type: ControlType
  onClick?: () => void
}

const icons: Record<ControlType, string> = {
  [ControlType.CLOSE]: ControlIcon.CLOSE,
  [ControlType.MINIMIZE]: ControlIcon.MINIMIZE,
  [ControlType.MAXIMIZE]: ControlIcon.MAXIMIZE,
  [ControlType.HELP]: ControlIcon.HELP,
  [ControlType.RESTORE]: ControlIcon.RESTORE,
}

const Control: FC<ControlProps> = ({ type, onClick }) => {
  const componentsClass = 'a_Control'
  return (
    <button className={componentsClass} onClick={onClick}>
      <Image
        src={icons[type]}
        alt={type}
        width={type === ControlType.HELP ? 6 : 8}
        height={type === ControlType.HELP ? 9 : 8}
        draggable={false}
      />
    </button>
  )
}

export default Control
