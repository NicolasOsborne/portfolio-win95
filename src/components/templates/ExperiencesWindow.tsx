'use client'

import { FC, useState } from 'react'
import { useContent } from '@/context/ContentContext'
import Tabs from '@/components/molecules/Tabs'

const ExperiencesWindow: FC = () => {
  const { content } = useContent()

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

  const componentsClass = 't_ExperiencesWindow'

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
          <fieldset className={`${componentsClass}_section`}>
            <legend className={`${componentsClass}_subtitle`}>
              <p className={`${componentsClass}_dates`}>
                {currentExperience.startDate}
                {currentExperience.endDate
                  ? ` - ${currentExperience.endDate}`
                  : ''}
              </p>
            </legend>
            {currentExperience.description.map((line, index) => (
              <p key={index} className={`${componentsClass}_description`}>
                {line}
              </p>
            ))}
          </fieldset>
        </div>
      )}
    </div>
  )
}

export default ExperiencesWindow
