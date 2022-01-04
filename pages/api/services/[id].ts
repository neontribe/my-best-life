import { NextApiHandler } from 'next'
import getUuid from 'uuid-by-string'

import { getServices } from '../../../cms/services'

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

const service: NextApiHandler = (req, res) => {
  const id = req.query.id as string

  const services = getServices()

  const data = services.find((service) => getUuid(service.id) === id)

  if (!data) {
    res.status(404).send('id not found')
    return
  }

  // normalises:
  // * "name@email.com "
  // * "first@email.com or second@email.com"
  const email = (data.email || '').trim().split(' ')[0]

  const response: Service = {
    id,
    organization: {
      id: getUuid(data.organisation),
      name: data.organisation,
      description: '',
    },
    name: data.title,
    description: data.description,
    url: data.website,
    email,
    cost_options: [
      {
        id: `amount-${data.id}`,
        service_id: data.id,
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

  res.status(200).json(response)
}

export default service
