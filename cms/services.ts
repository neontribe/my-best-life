import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import csvparser from 'csv-parser'
import { format, parse } from 'date-fns'
import en_GB from 'date-fns/locale/en-GB'

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
  timeList?: TimeList
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
  provider?: string
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
  | 'timeList'
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

export interface TimeList {
  startDate?: string
  endDate?: string
  days?: Array<FidTimeEntry>
}

interface idParams {
  params: {
    id: string
  }
}

interface FidAgeEntry {
  id: string
  fis_provider_name: string
  age_group_description: string
}

interface FidTimeEntry {
  id: string
  fis_provider_name: string
  day: string
  start_time: string
  end_time: string
}

interface FidGenderEntry {
  id: string
  provider_name: string
  eligibility_criteria_description: string
}
interface FidAreaEntry {
  id: string
  provider_name: string
  area_covered_description: string
}

interface FidCategoryEntry {
  id: string
  fis_provider_name: string
  level_1_description: string
  level_2_description: string
  level_3_description: string
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
async function createMarkdownFromCSV(overwriteEntries: boolean = false) {
  // Data delivered in several CSVs, majority of data comes from MBL main details.csv
  const mainFile = path.join(fixtureDirectory, `MBL main details.csv`)
  const ageFile = path.join(
    fixtureDirectory,
    `MBL minimum and maximum age range.csv`
  )
  const timeFile = path.join(fixtureDirectory, `MBL Time info.csv`)
  const genderFile = path.join(fixtureDirectory, `MBL Gender.csv`)
  const areaFile = path.join(fixtureDirectory, `MBL area covered.csv`)
  const categoryFile = path.join(
    fixtureDirectory,
    `MBL Interests and Category.csv`
  )

  const fidAgeData = await fileToArray<FidAgeEntry>(ageFile)
  const fidTimeData = await fileToArray<FidTimeEntry>(timeFile)
  const fidGenderData = await fileToArray<FidGenderEntry>(genderFile)
  const fidAreaData = await fileToArray<FidAreaEntry>(areaFile)
  const fidCategoryData = await fileToArray<FidCategoryEntry>(categoryFile)

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

        // Add cost info from the main sheet
        let costValue: string | number = ''
        let costQualifier = ''
        if (service.is_free === 'True') {
          costValue = 0
        } else if (service.per_hour === 'True') {
          costValue = service.total_cost__hour
          costQualifier = `£${costValue} per hour`
        } else if (service.per_day === 'True') {
          costValue = service.total_cost__day
          costQualifier = `£${costValue} per day`
        } else if (service.per_session === 'True') {
          costValue = service.total_cost__session
          costQualifier = `£${costValue} per session`
        } else if (service.per_week === 'True') {
          costValue = service.total_cost__week
          costQualifier = `£${costValue} per week`
        }

        // Add date info from the main sheet
        const start = parse(
          service.availability_start_date.split(' ')[0],
          'MM/dd/yyyy',
          new Date(),
          {
            locale: en_GB,
          }
        )
        const startFormatted = format(start, 'dd/MM/yyyy', {
          locale: en_GB,
        })

        const end = parse(
          service.availability_end_date.split(' ')[0],
          'MM/dd/yyyy',
          new Date(),
          {
            locale: en_GB,
          }
        )
        const endFormatted = format(end, 'dd/MM/yyyy', {
          locale: en_GB,
        })

        // Add opening hours from the separate CSV
        let daysOpen: Array<FidTimeEntry> = []

        if (fidTimeData !== undefined && fidTimeData.length) {
          daysOpen = fidTimeData.filter((item) => {
            return item.id === service.id
          })
        }

        // Add age range info from the separate CSV
        let age: Array<string>
        let min: string = ''
        let max: string = ''

        if (fidAgeData !== undefined && fidAgeData.length) {
          // The result of Array.find is possibly undefined
          const maybeAgeData: FidAgeEntry | undefined = fidAgeData.find(
            (item: FidAgeEntry) => item.id === service.id
          )

          if (maybeAgeData !== undefined) {
            age = maybeAgeData.age_group_description.split('-')
            min = age[0]
            max = age[1]
          }
        }

        // Add gender info from the separate CSV
        let genderEntries: Array<FidGenderEntry> = []

        if (fidGenderData !== undefined && fidGenderData.length) {
          genderEntries = fidGenderData.filter((item) => {
            return item.id === service.id
          })
        }

        const image =
          'img/fidfallback_' + Math.floor(Math.random() * 3 + 1) + '.jpg'
        const imageAlt = 'Family Information Directory fallback image'

        const genders = genderEntries.map((entry) =>
          entry.eligibility_criteria_description.toLowerCase()
        )

        // Add area info from the separate CSV
        let areaEntries: Array<FidAreaEntry> = []

        if (fidAreaData !== undefined && fidAreaData.length) {
          areaEntries = fidAreaData.filter((item) => {
            return item.id === service.id
          })
        }

        const areas = areaEntries.map((entry) =>
          entry.area_covered_description.trim()
        )

        // Add category info from the separate CSV
        let categoryEntries: Array<FidCategoryEntry> = []

        if (fidCategoryData !== undefined && fidCategoryData.length) {
          categoryEntries = fidCategoryData.filter((item) => {
            return item.id === service.id
          })
        }

        const interests = categoryEntries.map((entry) => {
          if (entry.level_2_description === 'Interests') {
            return entry.level_3_description.trim()
          }
        })

        const md = `---
organisation: ${service.fis_registration_name}
fidId: ${service.id}
title: ${service.provider_name}
shortDescription: ${service.provider_name} + description
image:
  image: "${image}"
  imageAlt: "${imageAlt}"
interests: ${JSON.stringify(interests)}
feelings:
description: "${service.service_description}"
costValue: ${costValue}
costQualifier: ${costQualifier}
format: ${service.delivery_channel_description}
expectation: "${service.note}"
email: ${service.e_mail}
phone: ${service.telephone || service.mobile}
website: ${service.web_site}
location: ${service.full_address}
area: ${JSON.stringify(areas)}
makeMapLink: ${Boolean(service.full_address)}
age:
  minAge: ${min}
  maxAge: ${max}
timeList: {startDate: ${startFormatted}, endDate: ${endFormatted}, days: ${JSON.stringify(
          daysOpen
        )} }
gender: ${JSON.stringify(genders)}
provider: ${service.provider_type_description || ''}
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

/*
 * Generic helper function to create arrays from CSV files
 * @param {string} file - the file path to the CSV
 * @param Type - the expect type of the resolved value
 */
function fileToArray<Type>(file: string): Promise<Array<Type>> {
  const dataArray: Array<Type> = []

  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
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
      .on('data', (data) => dataArray.push(data))
      .on('error', (err) => reject(err))
      .on('end', () => {
        resolve(dataArray)
      })
  })
}
