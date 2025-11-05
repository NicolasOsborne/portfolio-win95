'use client'

import { FC, useState } from 'react'
import { useContent } from '@/context/ContentContext'
import Tabs from '@/components/molecules/Tabs'

const ExperiencesWindow: FC = () => {
  const { content } = useContent()
  const componentsClass = 't_ExperiencesWindow'

  const experiences = content.experience.list

  const categories = experiences.map((exp) => ({
    key: exp.id,
    label: exp.title,
    experience: exp,
  }))

  const [activeTab, setActiveTab] = useState(categories[0].key)
  const currentExperience = categories.find(
    (c) => c.key === activeTab
  )?.experience

  return (
    <div className={componentsClass}>
      <Tabs
        tabs={categories.map((c) => ({ key: c.key, label: c.label }))}
        activeTab={activeTab}
        onTabClick={setActiveTab}
      />

      {currentExperience && (
        <div className={`${componentsClass}_content`}>
          <h1 className={`${componentsClass}_title`}>
            {currentExperience.subtitle}
          </h1>
          <p className={`${componentsClass}_dates`}>
            {currentExperience.startDate}
            {currentExperience.endDate ? ` - ${currentExperience.endDate}` : ''}
          </p>
          {currentExperience.description.map((line, i) => (
            <p key={i} className={`${componentsClass}_description`}>
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default ExperiencesWindow
