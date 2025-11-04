// Menu.tsx
import { FC } from 'react'
import Image from 'next/image'
import { MenuEntry } from '@/types/contentType'

type MenuProps = {
  entries: MenuEntry[]
  logoutLabel: string
}

const Menu: FC<MenuProps> = ({ entries, logoutLabel }) => {
  return (
    <div className='o_Menu'>
      <ul className='o_Menu_list'>
        {entries.map((entry) => (
          <li key={entry.id} className='o_Menu_item'>
            <Image src={entry.icon} alt={entry.label} width={18} height={18} />
            <span>{entry.label}</span>
          </li>
        ))}
      </ul>

      <div className='o_Menu_logout'>
        <Image
          src='/assets/win95/icons/menu/logout.svg'
          alt='logout'
          width={18}
          height={18}
        />
        <span>{logoutLabel}</span>
      </div>
    </div>
  )
}

export default Menu
