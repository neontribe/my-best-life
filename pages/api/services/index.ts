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
  const text = (Array.isArray(query.text) ? query.text.pop() : query.text) || ''
  // const keywords = text?.split(' ')

  const serviceData = getServices()

  const start = size * page - size
  const end = start + size

  const results = serviceData
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
    .filter((data) => {
      if (!text.length) {
        return true
      }

      return [data.name, data.organization.name, data.description].some(
        (value) => value && value.includes(text)
      )
    })
    .sort((a, b) => {
      if (!text.length) {
        return 0
      }

      // order by "most appropriate data richness"
      //
      // https://github.com/OpenReferralUK/human-services/blob/gh-pages/pages/API/APIValidation.md#level-2-compliance
      //
      // 1. data.name exact match
      // 2. data.name includes
      // 3. other fields

      if (a.name === text && b.name !== text) {
        return -1
      }

      if (a.name.includes(text) && !b.name.includes(text)) {
        return -1
      }

      return 0
    })

  const totalElements = results.length
  const totalPages = Math.ceil(totalElements / size)
  const content = results.slice(start, end)

  res.status(200).json({
    totalElements,
    totalPages,
    number: page,
    size: totalElements < size ? totalElements : size,
    first: page === 1,
    last: page === totalPages,
    empty: !content.length,
    content,
  })
}

export default service
