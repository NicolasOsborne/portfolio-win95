import { FC, ReactNode } from 'react'

export type TitleBarProps = {
  title: string
  controls?: ReactNode
}

const TitleBar: FC<TitleBarProps> = (props) => {
  const { title, controls } = props

  const componentsClass = 'm_TitleBar'

  return (
    <div className={componentsClass}>
      <span className={`${componentsClass}_title`}>{title}</span>
      {controls && (
        <div className={`${componentsClass}_controls`}>{controls}</div>
      )}
    </div>
  )
}

export default TitleBar
