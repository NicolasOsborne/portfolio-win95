'use client'

import { FC, useState } from 'react'
import { useContent } from '@/context/ContentContext'
import Tabs from '@/components/molecules/Tabs'
import SkillsChecklist from '@/components/molecules/SkillsChecklist'

const ProjectsWindow: FC = () => {
  const { content } = useContent()
  const componentsClass = 't_ProjectsWindow'

  const projects = content.projects.list

  const categories = projects.map((project) => ({
    key: project.id,
    label: project.title,
    project,
  }))

  const [activeTab, setActiveTab] = useState(categories[0].key)
  const currentProject = categories.find(
    (category) => category.key === activeTab
  )?.project

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

      {currentProject && (
        <>
          <div className={`${componentsClass}_content`}>
            <h1 className={`${componentsClass}_title`}>
              {currentProject.title}
            </h1>

            <p className={`${componentsClass}_shortDescription`}>
              {currentProject.shortDescription}
            </p>

            <fieldset className={`${componentsClass}_section`}>
              <legend className={`${componentsClass}_subtitle`}>
                {currentProject.subtitles.context}
              </legend>
              {currentProject.longDescription.map((line, index) => (
                <p key={index} className={`${componentsClass}_longDescription`}>
                  {line}
                </p>
              ))}
            </fieldset>

            {currentProject.realizations &&
              currentProject.realizations.length > 0 && (
                <fieldset className={`${componentsClass}_section`}>
                  <legend className={`${componentsClass}_subtitle`}>
                    {currentProject.subtitles.steps}
                  </legend>
                  <div className={`${componentsClass}_realizations`}>
                    <ul>
                      {currentProject.realizations.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </fieldset>
              )}

            {currentProject.languagesUsed &&
              currentProject.languagesUsed.length > 0 && (
                <fieldset className={`${componentsClass}_section`}>
                  <legend className={`${componentsClass}_subtitle`}>
                    {currentProject.subtitles.tools}
                  </legend>
                  <div className={`${componentsClass}_technologies`}>
                    <SkillsChecklist skills={currentProject.languagesUsed} />
                  </div>
                </fieldset>
              )}
          </div>

          <div className={`${componentsClass}_buttons`}>
            {currentProject.githubLink && (
              <a
                className={`${componentsClass}_button`}
                href={currentProject.githubLink}
                target='_blank'
              >
                {currentProject.githubLabel}
              </a>
            )}
            {currentProject.websiteLink && (
              <a
                className={`${componentsClass}_button`}
                href={currentProject.websiteLink}
                target='_blank'
              >
                {currentProject.websiteLabel}
              </a>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectsWindow
