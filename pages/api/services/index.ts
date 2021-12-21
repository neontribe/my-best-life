import { NextApiHandler } from 'next'
import getUuid from 'uuid-by-string'

import { getServices } from '../../../cms/services'

const getParam = (arg: string | string[], fallback: number) => {
  return parseInt(
    (Array.isArray(arg) ? arg.pop() : arg) || fallback.toString(),
    10
  )
}

// Open Referral UK Data Standard
interface Organization {
  id: string
  name: string
  description: string
  email?: string
  url?: string
  logo?: string
  uri?: string
}

// Open Referral UK Data Standard
interface Service {
  id: string
  organization: Organization
  name: string
  description?: string
  url?: string
  email?: string
  fees?: string
}

const service: NextApiHandler = ({ query }, res) => {
  const page = getParam(query.page, 1)
  const size = getParam(query.size, 50)

  const serviceData = getServices()

  const start = size * page - size
  const end = start + size

  const data = serviceData
    .map((data) => {
      const serviceId = getUuid(data.id)

      // normalises:
      // * "name@email.com "
      // * "first@email.com or second@email.com"
      const email = (data.email || '').trim().split(' ')[0]

      const costValue =
        data.costValue !== undefined ? data.costValue.toString() : undefined

      const response: Service = {
        id: serviceId,
        organization: {
          id: getUuid(data.organisation),
          name: data.organisation,
          description: '',
        },
        name: data.title,
        description: data.description?.trim(),
        url: data.website,
        fees: data.costExplanation || costValue,
      }

      if (email) {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

        if (!isValidEmail) {
          console.warn(`${data.email} is not a valid email address.`)
        }

        response.email = (isValidEmail && email) || undefined
      }

      return response
    })
    .slice(start, end)

  const totalElements = serviceData.length
  const totalPages = totalElements / size

  res.status(200).json({
    totalElements,
    totalPages,
    number: page,
    size,
    first: page === 1,
    last: page === totalPages,
    content: data,
  })
}

export default service
