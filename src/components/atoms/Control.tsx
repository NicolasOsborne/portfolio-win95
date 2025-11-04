import { FC } from 'react'
import ControlType from '@/enums/ControlType'
import Image from 'next/image'

export type ControlProps = {
  type: ControlType
  onClick?: () => void
}

const icons: Record<ControlType, string> = {
  [ControlType.CLOSE]: '/assets/win95/icons/controls/close.svg',
  [ControlType.MINIMIZE]: '/assets/win95/icons/controls/minimize.svg',
  [ControlType.MAXIMIZE]: '/assets/win95/icons/controls/maximize.svg',
  [ControlType.HELP]: '/assets/win95/icons/controls/help.svg',
  [ControlType.RESTORE]: '/assets/win95/icons/controls/restore.svg',
}

const Control: FC<ControlProps> = ({ type, onClick }) => {
  const componentsClass = 'a_Control'
  return (
    <button className={componentsClass} onClick={onClick}>
      <Image
        src={icons[type]}
        alt={type}
        width={6}
        height={9}
        draggable={false}
      />
    </button>
  )
}

export default Control
