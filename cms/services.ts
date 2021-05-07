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
  interests: Array<Interest>
  feelings: Array<string>
  costValue: number
  costQualifier?: string
  costExplanation: string
  age?: { minAge: number; maxAge: number }
  gender?: Array<Gender>
  eligibility?: string
  format: Formats
  time?: string
  expectation?: string
  quotation?: string
  access?: string
  location?: string
  makeMapLink?: boolean
  contactExplanation?: string
  email?: string
  form?: string
  phone?: string
  website?: string
  reviews?: Array<Review>
  saved: boolean
  score: number
  promoted: boolean
  area?: Array<Area>
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

export type Gender =
  | 'men'
  | 'women'
  | 'non-binary'
  | 'transgender'
  | 'intersex'
  | 'gender non-conforming'
  | 'genderqueer'
  | 'agender'

export type Interest =
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

export type Area =
  | 'Gipsy Hill'
  | 'Thurlow Park'
  | 'Herne Hill'
  | 'Clapham Common'
  | 'Clapham Town'
  | "Bishop's"
  | 'Streatham South'
  | 'Thornton'
  | "Knight's Hill"
  | "St Leonard's"
  | "Prince's"
  | 'Oval'
  | 'Stockwell'
  | 'Vassall'
  | 'Coldharbour'
  | 'Streatham Wells'
  | 'Streatham Hill'
  | 'Ferndale'
  | 'Tulse Hill'
  | 'Brixton Hill'
  | 'Larkhall'

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
  | 'makeMapLink'
  | 'time'
  | 'quotation'
  | 'expectation'
  | 'contactExplanation'
  | 'email'
  | 'form'
  | 'phone'
  | 'website'
  | 'reviews'
  | 'format'
>

export interface Review {
  comment?: string
  rating?: number
  author?: number
}

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
