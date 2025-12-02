import { FC } from 'react'

const SkillsChecklist: FC<{ skills: string[] }> = ({ skills }) => {
  const componentsClass = 'm_SkillsChecklist'

  return (
    <ul className={componentsClass}>
      {skills.map((skill, i) => (
        <li key={i} className={`${componentsClass}_item`}>
          <input type='checkbox' checked readOnly />
          <label>{skill}</label>
        </li>
      ))}
    </ul>
  )
}

export default SkillsChecklist
