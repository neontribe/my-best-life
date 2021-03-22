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
  categories?: { category1: Category; category2: Category }
  interest: Interest
  costValue: number
  costQualifier?: string
  costExplanation: string
  age?: { minAge: number; maxAge: number }
  gender?: Gender
  eligibility?: string
  format: Formats
  time?: string
  expectation?: string
  quotation?: string
  location?: string
  contactExplanation?: string
  email?: string
  form?: string
  phone?: string
  website?: string
  saved: boolean
}

type Category =
  | 'Money'
  | 'School and College'
  | 'Sex and Relationships'
  | 'Mental Health'
  | 'Keeping Safe'
  | 'Job Stuff'
  | "Where I'm Living"
  | 'Friends'
  | 'Family'
  | 'Drink and Drugs'
  | 'My Body'
  | 'My Rights and the Law'

type Formats =
  | 'One to one chats'
  | 'Meeting a group of people'
  | 'Online'
  | 'Over the phone'

type Gender =
  | 'men'
  | 'women'
  | 'non-binary'
  | 'transgender'
  | 'intersex'
  | 'gender non-conforming'
  | 'genderqueer'
  | 'agender'

type Interest =
  | 'Sports'
  | 'Music'
  | 'Films and TV'
  | 'Art and Design'
  | 'Drama'
  | 'Reading'
  | 'Writing'
  | 'Cooking'
  | 'Volunteering'
  | 'Outdoor Activities'
  | 'Activism'
  | 'Fashion and Beauty'

export type ServiceDetail = Pick<
  Service,
  | 'id'
  | 'organisation'
  | 'description'
  | 'title'
  | 'image'
  | 'categories'
  | 'eligibility'
  | 'age'
  | 'costExplanation'
  | 'location'
  | 'time'
  | 'quotation'
  | 'expectation'
  | 'contactExplanation'
  | 'email'
  | 'form'
  | 'phone'
  | 'website'
  | 'format'
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
  const serviceDetails = { id: id, ...data } as ServiceDetail

  return {
    ...serviceDetails,
  }
}
