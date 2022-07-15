import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import csvparser from 'csv-parser'

// This interface should match the config of the CMS
export interface Service {
  id: string
  fidId?: string
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
  costExplanation?: string
  age?: { minAge: number; maxAge: number }
  gender?: Array<Gender>
  eligibility?: string
  format: Formats
  time?: string
  expectation?: string
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

export type Category =
  | 'Money'
  | 'School and College'
  | 'Sex and Relationships'
  | 'Mental Health'
  | 'Keeping Safe'
  | 'Job Stuff'
  | 'Housing'
  | 'Friends'
  | 'Family'
  | 'Drink and Drugs'
  | 'Physical Health'
  | 'My Rights and the Law'

type Formats =
  | 'One to one chats'
  | 'Meeting a group of people'
  | 'Online'
  | 'Over the phone'

export type Gender =
  | 'male'
  | 'female'
  | 'non-binary / non-conforming'
  | 'transgender'

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
  | 'Gaming'

export type Area =
  | 'Brixton Stockwell'
  | 'Brixton Tulse Hill'
  | 'Clapham and Brixton Hill'
  | 'Norwood'
  | 'Streatham'
  | 'North Lambeth'

export type ServiceDetail = Pick<
  Service,
  | 'id'
  | 'organisation'
  | 'description'
  | 'title'
  | 'image'
  | 'categories'
  | 'costValue'
  | 'eligibility'
  | 'age'
  | 'costExplanation'
  | 'location'
  | 'makeMapLink'
  | 'time'
  | 'expectation'
  | 'contactExplanation'
  | 'email'
  | 'form'
  | 'phone'
  | 'website'
  | 'reviews'
  | 'format'
  | 'shortDescription'
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
const fixtureDirectory = path.join(process.cwd(), './fixtures')

export function getServices(): Array<Service> {
  // This will be re-enabled when the source files are received from emails
  //createMarkdownFromCSV(true)

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

// We know we are not using this function until we have email data
/* eslint-disable @typescript-eslint/no-unused-vars */

/*
 * Automatically create CMS markdown entries from imported CSVs.
 * @param {boolean} overwriteEntries - whether to overwrite content in existing md files
 */
function createMarkdownFromCSV(overwriteEntries: boolean = false) {
  // Data delivered in several CSVs, majority of data comes from MBL main details.csv
  const mainFile = path.join(fixtureDirectory, `MBL main details.csv`)

  // Main data
  const results: any = []
  fs.createReadStream(mainFile)
    .pipe(
      csvparser({
        // map over headers returned, normalise and replace first header with id
        mapHeaders: ({ header, index }) => {
          if (index === 0) {
            return 'id'
          }
          return header.trim().replace(/\s+/g, '_').toLowerCase()
        },
      })
    )
    .on('data', (data) => results.push(data))
    .on('end', () => {
      results.map((service: any) => {
        // The last CSV row can be empty, bail out if we can't retrieve data
        if (service.fis_registration_name === undefined) {
          return
        }

        const filename =
          service.fis_registration_name
            .toLowerCase()
            // replace special characters
            .replace(/[^a-zA-Z0-9\s]/g, '')
            // replace whitespace with -
            .replace(/\s+/g, '-') +
          '-' +
          service.id
        const fullPath = path.join(contentDirectory, `${filename}.md`)

        // Skip over files that already exist
        if (fs.existsSync(fullPath) && !overwriteEntries) {
          return
        }

        const md = `---
organisation: ${service.fis_registration_name}
fidId: ${service.id}
title: ${service.provider_name}
shortDescription: ${service.provider_name} + description
image:
  image: img/fid_placeholder.png
  imageAlt: ""
costValue: 0
interests:
feelings:
description: "${service.service_description}"
format: ${service.delivery_channel_description}
expectation: "${service.note}"
email: ${service.e_mail}
phone: ${service.telephone || service.mobile}
website: ${service.web_site}
location: ${service.full_address}
makeMapLink: ${Boolean(service.full_address)}
---

`

        const overwrite = overwriteEntries ? 'w' : ''

        fs.writeFile(
          fullPath,
          md,
          {
            flag: overwrite,
          },
          (err) => {
            if (err) {
              console.error(err)
            }
          }
        )
      })
    })
}
