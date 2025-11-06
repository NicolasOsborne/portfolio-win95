export type Locale = 'en' | 'fr'

export type LoginContent = {
  title: string
  icon: string
  prompt: string
  username: string
  password: string
  ok: string
  cancel: string
  errors: {
    usernameRequired: string
    passwordRequired: string
    error: string
  }
}

export type DesktopContent = {
  menu: MenuContent
  greeting: string
  logout: string
  recycle: {
    id: string
    label: string
    icon: string
    contentKey: string
  }
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
  cvLabel: string
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
  websiteLabel?: string
  githubLabel?: string
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

export type Contact = {
  label: string
  placeholder: string
}

export type ContactContent = {
  title: string
  name: Contact
  email: Contact
  message: Contact
  submit: string
  cancel: string
  errors: {
    nameRequired: string
    email: {
      invalid: string
      required: string
    }
    message: string
    success: string
    error: string
  }
}

export type Content = {
  login: LoginContent
  desktop: DesktopContent
  about: AboutContent
  skills: SkillsContent
  projects: ProjectsContent
  experience: ExperienceContent
  contact: ContactContent
}
