import fs from 'fs'
import matter from 'gray-matter'

export interface About {
  content: string
}

export function getAbout(): About {
  const fileContents = fs.readFileSync('./content/about/about.md', 'utf8')

  // Use gray-matter to parse the file frontmatter
  const { data } = matter(fileContents)

  const about: About = { content: data.content }

  return about
}
