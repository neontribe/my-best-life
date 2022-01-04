import { NextApiHandler } from 'next'
import getUuid from 'uuid-by-string'

import { getServices } from '../../../cms/services'

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
  // organization_id: string
  organization: Organization
  name: string
  description?: string
  url?: string
  email?: string
  fees?: string
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

  const costValue =
    data.costValue !== undefined ? data.costValue.toString() : undefined

  const response: Service = {
    id,
    // organization_id: data.organisation,
    organization: {
      id: getUuid(data.organisation),
      name: data.organisation,
      description: '',
    },
    name: data.title,
    description: data.description,
    url: data.website,
    email,
    fees: data.costExplanation || costValue,
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
