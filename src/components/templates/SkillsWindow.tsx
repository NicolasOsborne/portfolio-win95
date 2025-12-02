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
      label: skills.devSkills.title,
      subtitle: skills.devSkills.subtitle,
      list: skills.devSkills.list,
    },
    {
      key: 'languageSkills',
      label: skills.languageSkills.title,
      subtitle: skills.languageSkills.subtitle,
      list: skills.languageSkills.list,
    },
    {
      key: 'toolSkills',
      label: skills.toolSkills.title,
      subtitle: skills.toolSkills.subtitle,
      list: skills.toolSkills.list,
    },
    {
      key: 'softSkills',
      label: skills.softSkills.title,
      subtitle: skills.softSkills.subtitle,
      list: skills.softSkills.list,
    },
    {
      key: 'otherSkills',
      label: skills.otherSkills.title,
      subtitle: skills.otherSkills.subtitle,
      list: skills.otherSkills.list,
    },
  ]

  const [activeTab, setActiveTab] = useState(categories[0].key)
  const currentCategory = categories.find((c) => c.key === activeTab)

  return (
    <div className={componentsClass}>
      <Tabs
        tabs={categories.map((category) => ({
          key: category.key,
          label: category.label,
        }))}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />
      <div className={`${componentsClass}_content`}>
        {currentCategory && (
          <fieldset className={`${componentsClass}_section`}>
            <legend className={`${componentsClass}_subtitle`}>
              {currentCategory.subtitle}
            </legend>
            <SkillsChecklist skills={currentCategory.list} />
          </fieldset>
        )}
      </div>
    </div>
  )
}

export default SkillsWindow
