import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

// This interface should match the config of the CMS
interface Service {
  organisation: string
  title: string
  shortDescription: string
  image?: string
  description: string
  categories?: Array<string>
  cost?: { costValue: number; costQualifier: string; costExplanation: string }
  age?: { minAge: number; maxAge: number }
  gender?: string
  eligibility?: string
  format?: '' | 'oneToOne' | 'meetingGroup' | 'overThePhone'
  location?: string
}

export interface ServicePreview {
  organisation: string
  shortDescription: string
  imagePath?: string
  cost?: string
  age?: string
  categories?: Array<string>
}

const contentDirectory = path.join(process.cwd(), './content/services')

function getServices(): Array<Service> {
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

export function getServicePreviews(): Array<ServicePreview> {
  const everything = getServices()

  const allServicePreviews: Array<ServicePreview> = everything.map(
    (service) => {
      const servicePreview = {
        organisation: service.organisation,
        shortDescription: service.shortDescription,

        ...((service.age?.maxAge || service.age?.minAge) && {
          age: formatAgeDisplay(service.age.minAge, service.age.maxAge),
        }),

        ...((service.cost?.costValue ||
          service.cost?.costValue === 0 ||
          service.cost?.costQualifier) && {
          cost: formatCostDisplay(
            service.cost.costValue,
            service.cost.costQualifier
          ),
        }),
      }

      return servicePreview
    }
  )

  return allServicePreviews
}

function formatAgeDisplay(min: number, max: number): string {
  // There is only a minimum age
  if (!max) {
    return `${min}+`
  }
  // There is only a maximum age
  else if (!min) {
    return `under ${max}`
  }
  // There is an age range
  else {
    if (min === max) {
      return `${min}`
    } else {
      return `${min}-${max}`
    }
  }
}

function formatCostDisplay(cost: number, qualifier: string): string {
  if (qualifier) {
    return qualifier
  } else if (cost === 0) {
    return 'Free'
  } else {
    return `£${String(cost)}`
  }
}
