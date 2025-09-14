interface iDrawerItem {
  id: string
  icon?: JSX.Element
  title: string
  url: string
  external?: boolean
}

interface iSkillCard {
  category: string
  technologies: string[]
}
