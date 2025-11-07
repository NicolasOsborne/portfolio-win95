import { FC, useState } from 'react'
import Image from 'next/image'
import { MenuEntry } from './MenuItem'
import classNames from 'classnames'

export type DesktopIconProps = {
  entry: MenuEntry
  onClick?: () => void
  isRecycle?: boolean
}

const DesktopIcon: FC<DesktopIconProps> = (props) => {
  const { entry, onClick, isRecycle } = props
  const { icon, label } = entry
  const [isSelected, setIsSelected] = useState(false)
  const [isFlashing, setIsFlashing] = useState(false)

  const handleDoubleClick = () => {
    setIsFlashing(true)
    onClick?.()
    setTimeout(() => setIsFlashing(false), 200)
  }

  const componentsClass = 'a_DesktopIcon'

  return (
    <button
      type='button'
      className={classNames(componentsClass, {
        [`${componentsClass}_recycle`]: isRecycle,
        [`${componentsClass}_selected`]: isSelected,
        [`${componentsClass}_flashing`]: isFlashing,
      })}
      onDoubleClick={handleDoubleClick}
      onClick={(e) => {
        e.stopPropagation()
        setIsSelected(true)
      }}
      onBlur={() => setIsSelected(false)}
    >
      <div className={`${componentsClass}_icon`}>
        <Image src={icon} alt={label} width={42} height={42} />
      </div>
      <p className={`${componentsClass}_label`}>{label}</p>
    </button>
  )
}

export default DesktopIcon
