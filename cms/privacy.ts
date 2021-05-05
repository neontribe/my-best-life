import fs from 'fs'
import matter from 'gray-matter'

export interface PrivacyPolicy {
  content: string
}

export function getPrivacy(): PrivacyPolicy {
  const fileContents = fs.readFileSync('./content/privacy/privacy.md', 'utf8')

  // Use gray-matter to parse the file frontmatter
  const { data } = matter(fileContents)

  const privacyPolicy: PrivacyPolicy = { content: data.content }

  return privacyPolicy
}
