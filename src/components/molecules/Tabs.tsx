import { FC } from 'react'

type TabsProps = {
  tabs: { key: string; label: string }[]
  activeTab: string
  onTabClick: (key: string) => void
}

const Tabs: FC<TabsProps> = ({ tabs, activeTab, onTabClick }) => {
  const componentsClass = 'm_Tabs'

  return (
    <div className={componentsClass} role='tablist'>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type='button'
          role='tab'
          aria-selected={activeTab === tab.key}
          className={`${componentsClass}_tab ${
            activeTab === tab.key ? `${componentsClass}_tab-active` : ''
          }`}
          onClick={() => onTabClick(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

export default Tabs
