import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

// This interface should match the config of the CMS
export interface Service {
  organisation: string
  title: string
  shortDescription: string
  image?: { image: string; imageAlt: string }
  description: string
  categories?: { category1: string; category2: string }
  cost?: { costValue: number; costQualifier: string; costExplanation: string }
  age?: { minAge: number; maxAge: number }
  gender?: string
  eligibility?: string
  format?: '' | 'oneToOne' | 'meetingGroup' | 'overThePhone'
  location?: string
}

const contentDirectory = path.join(process.cwd(), './content/services')

export function getServices(): Array<Service> {
  const fileNames = fs.readdirSync(contentDirectory)

  const allServices: Array<Service> = fileNames
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the file frontmatter
      const { data } = matter(fileContents)

      // Assert that our result must be a service
      const service = data as Service

      return service
    })

  return allServices
}
