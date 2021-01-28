import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export interface ServicePreview {
  organisation: string
  shortDescription: string
  imagePath?: string
  cost?: string
  age?: string
  categories?: Array<string>
}

export interface ServiceDetail {
  organisation: string
  shortDescription: string
  description: string
  imagePath?: string
  cost?: string
  age?: string
  gender?: string
  eligibility?: string
  format?: string
  location?: string
  categories?: Array<string>
}

const contentDirectory = path.join(process.cwd(), './content/services')

export function getServicePreviews(): Array<ServicePreview> {
  const fileNames = fs.readdirSync(contentDirectory)

  const allServicePreviews: Array<ServicePreview> = fileNames
    .filter((file) => file.endsWith('.md'))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(contentDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      // Use gray-matter to parse the file frontmatter
      const { data } = matter(fileContents)

      const returnObj = {
        ...{ organisation: data.organisation },

        ...(data.shortDescription && {
          shortDescription: data.shortDescription,
        }),

        ...((data.age.maxAge || data.age.minAge) && {
          age: getAgeDisplay(data.age.minAge, data.age.maxAge),
        }),

        ...((data.cost.costValue ||
          data.cost.costValue === 0 ||
          data.cost.costQualifier) && {
          cost: getCostDisplay(data.cost.costValue, data.cost.costQualifier),
        }),
      }

      return returnObj
    })

  return allServicePreviews
}

function getAgeDisplay(min: number, max: number): string {
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
    return `${min}-${max}`
  }
}

function getCostDisplay(cost: number, qualifier: string): string {
  if (qualifier) {
    return qualifier
  } else if (cost === 0) {
    return 'Free'
  } else {
    return `£${String(cost)}`
  }
}
