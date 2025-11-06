import { FC } from 'react'
import Image from 'next/image'

export type MenuEntry = {
  id?: string
  label: string
  icon: string
  contentKey: string
}

export type MenuItemProps = {
  entry: MenuEntry
  onClick?: (contentKey: string) => void
}

const MenuItem: FC<MenuItemProps> = (props) => {
  const { entry, onClick } = props
  const { icon, label, contentKey } = entry

  const componentClass = 'a_MenuItem'

  return (
    <button
      type='button'
      className={componentClass}
      onClick={() => onClick?.(contentKey)}
    >
      <Image
        className={`${componentClass}_icon`}
        src={icon}
        alt={label}
        width={32}
        height={32}
      />
      <span className={`${componentClass}_label`}>{label}</span>
    </button>
  )
}

export default MenuItem
