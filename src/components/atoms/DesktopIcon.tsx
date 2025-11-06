import { FC } from 'react'
import Image from 'next/image'
import { MenuEntry } from './MenuItem'
import classNames from 'classnames'
import { useWindows } from '@/context/WindowContext'

export type DesktopIconProps = {
  entry: MenuEntry
  onClick?: () => void
  isRecycle?: boolean
}

const DesktopIcon: FC<DesktopIconProps> = (props) => {
  const { entry, onClick, isRecycle } = props
  const { icon, label, contentKey } = entry
  const { focusWindow } = useWindows()

  const componentsClass = 'a_DesktopIcon'

  return (
    <button
      type='button'
      className={classNames(componentsClass, {
        [`${componentsClass}_recycle`]: isRecycle,
      })}
      onClick={() => focusWindow(contentKey)}
      onDoubleClick={onClick}
    >
      <Image
        className={`${componentsClass}_icon`}
        src={icon}
        alt={label}
        width={42}
        height={42}
      />
      <p className={`${componentsClass}_label`}>{label}</p>
    </button>
  )
}

export default DesktopIcon
