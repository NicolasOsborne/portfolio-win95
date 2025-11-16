import { FC } from 'react'
import Image from 'next/image'
import MenuItem, { MenuEntry } from '../atoms/MenuItem'
import DesktopIcon from '@/enums/DesktopIcon'

export type MenuProps = {
  entries: MenuEntry[]
  logoutLabel: string
  onItemClick?: (contentKey: string) => void
  onLogout?: () => void
}

const Menu: FC<MenuProps> = (props) => {
  const { entries, logoutLabel, onItemClick, onLogout } = props

  const componentClass = 'm_Menu'
  const childClass = 'a_MenuItem'

  return (
    <div className={componentClass}>
      <div className={`${componentClass}_list`}>
        {entries.map((entry) => (
          <MenuItem key={entry.id} entry={entry} onClick={onItemClick} />
        ))}
        <button
          className={`${childClass} ${childClass}_logout`}
          onClick={onLogout}
        >
          <Image
            src={DesktopIcon.SHUTDOWN}
            alt={logoutLabel}
            width={32}
            height={32}
          />
          <span className={`${childClass}_label`}>{logoutLabel}</span>
        </button>
      </div>
    </div>
  )
}

export default Menu
