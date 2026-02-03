'use client'

import { FC } from 'react'
import { useContent } from '@/context/ContentContext'
import Button from '../atoms/Button'

const AboutWindow: FC = () => {
  const { content } = useContent()

  const componentsClass = 't_AboutWindow'

  return (
    <>
      <div className={componentsClass}>
        <div className={`${componentsClass}_content`}>
          <h1 className={`${componentsClass}_title`}>{content.about.title}</h1>
          {content.about.description.map((line, index) => (
            <p key={index} className={`${componentsClass}_description`}>
              {line}
            </p>
          ))}
        </div>
      </div>
      <div className={`${componentsClass}_footer`}>
        <Button
          type='button'
          disabled={false}
          className={`${componentsClass}_download`}
        >
          {content.about.cvLabel}
        </Button>
      </div>
    </>
  )
}

export default AboutWindow
