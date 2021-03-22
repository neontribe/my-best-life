import { NowRequest, NowResponse } from '@vercel/node'
import { GoogleSpreadsheet } from 'google-spreadsheet'

interface IReviewShape {
  serviceId: string
  rating?: number
  comment?: string
  usedService: boolean
}

export default async (req: NowRequest, res: NowResponse): Promise<void> => {
  if (
    !process.env.REVIEW_SHEET_ID ||
    !process.env.REVIEW_CLIENT_EMAIL ||
    !process.env.REVIEW_PRIVATE_KEY
  ) {
    res.status(500).send('Server not configured to save reviews')
    return
  }

  if (req.method !== 'POST') {
    res.status(400).send('Expected POST request')
    return
  }

  const body: IReviewShape = req.body

  if (!body.comment?.trim() && !body.rating && !body.usedService) {
    // Silently discard empty submissions
    res.status(200).send('OK')
    return
  }

  const doc = new GoogleSpreadsheet(process.env.REVIEW_SHEET_ID)
  await doc.useServiceAccountAuth({
    client_email: process.env.REVIEW_CLIENT_EMAIL,
    private_key: process.env.REVIEW_PRIVATE_KEY.replace(/\\n/g, '\n'),
  })

  await doc.loadInfo()
  const sheet = doc.sheetsByIndex[0]

  // This expects a sheet with headings: service, comment, rating, usedService, timestamp
  try {
    await sheet.addRow({
      service: body.serviceId,
      comment: body.comment || '',
      rating: body.rating || '',
      usedService: body.usedService ? 'yes' : 'no',
      timestamp: Date.now(),
    })
  } catch {
    res.status(500).send("Couldn't save review")
    return
  }

  res.status(200).send('OK')
  return
}
