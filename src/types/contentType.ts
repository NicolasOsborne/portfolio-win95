export type Locale = 'en' | 'fr'

export type LoginContent = {
  title: string
  prompt: string
  username: string
  password: string
  ok: string
  cancel: string
  error: string
}

export type DesktopContent = {
  menu: MenuContent
  greeting: string
  logout: string
}

export type MenuEntry = {
  id: string
  label: string
  icon: string
  contentKey: 'about' | 'skills' | 'projects' | 'experience' | 'contact'
}

export type MenuContent = {
  title: string
  list: MenuEntry[]
}

export type AboutContent = {
  title: string
  description: string[]
  cvLink: string
}

export type SkillList = {
  subtitle: string
  list: string[]
}

export type SkillsContent = {
  title: string
  devSkills: SkillList
  languageSkills: SkillList
  toolSkills: SkillList
  softSkills: SkillList
  otherSkills: SkillList
}

export type Project = {
  id: string
  title: string
  shortDescription: string
  longDescription: string[]
  languagesUsed: string[]
  realizations: string[]
  websiteLink?: string
  githubLink?: string
}

export type ProjectsContent = {
  title: string
  list: Project[]
}

export type Experience = {
  id: string
  title: string
  subtitle: string
  description: string[]
  startDate?: string
  endDate?: string
}

export type ExperienceContent = {
  title: string
  list: Experience[]
}

export type Content = {
  login: LoginContent
  desktop: DesktopContent
  about: AboutContent
  skills: SkillsContent
  projects: ProjectsContent
  experience: ExperienceContent
}
