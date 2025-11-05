'use client'

import { FC, useState } from 'react'
import { useContent } from '@/context/ContentContext'
import Tabs from '@/components/molecules/Tabs'
import SkillsChecklist from '@/components/molecules/SkillsChecklist'

const SkillsWindow: FC = () => {
  const { content } = useContent()
  const componentsClass = 't_SkillsWindow'

  const skills = content.skills

  const categories = [
    {
      key: 'devSkills',
      label: skills.devSkills.subtitle,
      list: skills.devSkills.list,
    },
    {
      key: 'languageSkills',
      label: skills.languageSkills.subtitle,
      list: skills.languageSkills.list,
    },
    {
      key: 'toolSkills',
      label: skills.toolSkills.subtitle,
      list: skills.toolSkills.list,
    },
    {
      key: 'softSkills',
      label: skills.softSkills.subtitle,
      list: skills.softSkills.list,
    },
    {
      key: 'otherSkills',
      label: skills.otherSkills.subtitle,
      list: skills.otherSkills.list,
    },
  ]

  const [activeTab, setActiveTab] = useState(categories[0].key)
  const currentCategory = categories.find((c) => c.key === activeTab)

  return (
    <div className={componentsClass}>
      <Tabs
        tabs={categories.map((c) => ({ key: c.key, label: c.label }))}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <div className={`${componentsClass}_content`}>
        {currentCategory && <SkillsChecklist skills={currentCategory.list} />}
      </div>
    </div>
  )
}

export default SkillsWindow
