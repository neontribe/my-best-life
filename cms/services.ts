import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

// This interface should match the config of the CMS
export interface Service {
  id: string
  organisation: string
  title: string
  shortDescription: string
  image?: { image: string; imageAlt: string }
  description: string
  categories?: { category1: string; category2: string }
  costValue: number
  costQualifier?: string
  costExplanation: string
  age?: { minAge: number; maxAge: number }
  gender?: string
  eligibility?: string
  format?: '' | 'oneToOne' | 'meetingGroup' | 'overThePhone'
  time?: string
  access?: string
  location?: string
  contactExplanation?: string
  email?: string
  form?: string
  phone?: string
  website?: string
}

export type ServiceDetail = Pick<
  Service,
  | 'id'
  | 'organisation'
  | 'description'
  | 'title'
  | 'image'
  | 'categories'
  | 'costExplanation'
  | 'location'
  | 'time'
  | 'access'
  | 'contactExplanation'
  | 'email'
  | 'form'
  | 'phone'
  | 'website'
>

interface idParams {
  params: {
    id: string
  }
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

      const serviceId = fileName.replace(/\.md$/, '')

      // Use gray-matter to parse the file frontmatter
      const { data } = matter(fileContents)

      // Add id and assert that our result must be a Service
      const service = { id: serviceId, ...data } as Service

      return service
    })

  return allServices
}

export function getAllServiceIds(): Array<idParams> {
  const fileNames = fs.readdirSync(contentDirectory)

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    }
  })
}

export function getServiceData(id: string): ServiceDetail {
  const fullPath = path.join(contentDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the file frontmatter
  const { data } = matter(fileContents)

  // Assert that our result must be a ServiceDetail
  const serviceDetails = data as ServiceDetail

  return {
    ...serviceDetails,
  }
}
