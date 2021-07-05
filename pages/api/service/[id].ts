import { GetStaticProps, NextApiHandler } from 'next'

import { getServiceData } from '../../../cms/services'

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const serviceData = getServiceData(params.id)

  return {
    props: {
      serviceData,
    },
  }
}

const service: NextApiHandler = (req, res) => {
  const id = req.query.id as string

  const serviceData = getServiceData(id)

  res.status(200).json({
    id: `${serviceData.id}`,
    organisation: `${serviceData.organisation}`,
    title: `${serviceData.title}`,
    shortDescription: `${serviceData.shortDescription}`,
    website: `${serviceData.website}`,
  })
}

export default service
