import { NextApiHandler } from 'next'
import getUuid from 'uuid-by-string'

import { getServices } from '../../../cms/services'

const getParam = (arg: string | string[], fallback: number) => {
  return parseInt(
    (Array.isArray(arg) ? arg.pop() : arg) || fallback.toString(),
    10
  )
}

interface Organization {
  id: string
  name: string
  description: string
  email?: string
  url?: string
  logo?: string
  uri?: string
}

interface CostOption {
  id: string
  service_id: string
  amount?: number
  amount_description?: string
}

interface Service {
  id: string
  organization: Organization
  name: string
  description?: string
  url?: string
  email?: string
  cost_options: CostOption[]
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
        cost_options: [
          {
            id: `amount-${serviceId}`,
            service_id: serviceId,
            amount_description: (data.costExplanation || '').trim(),
            amount: data.costValue,
          },
        ],
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
