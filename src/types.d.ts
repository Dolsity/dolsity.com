interface iDrawerItem {
  id: string
  icon?: JSX.Element
  title: string
  url: string
  external?: boolean
}

interface iFooterItem {
  id: string
  title: string
  links: { id: string; title: string; url: string }[]
}

interface iFooterIcon {
  id: string
  icon: JSX.Element
  url: string
}

interface iSkillCard {
  category: string
  technologies: string[]
}

interface iProjectCard {
  title: string
  summary: string
  image?: string | StaticImageData
  githubUrl?: string
  demoUrl?: string
  technologies: string[]
  description?: string
}
