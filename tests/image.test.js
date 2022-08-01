/**
 * @jest-environment jsdom
 */

import fs from 'fs'
import path from 'path'
import { getServices } from '../cms/services'

/*
 * Pulling all images
 */

const getImages = () => {
  const contentDirectory = path.join(process.cwd(), './public/img')
  const fileNames = fs.readdirSync(contentDirectory)

  return fileNames
}

const images = getImages()
const services = getServices()

it('Services images exist', () => {
  services.map((service) => {
    const imageExists = images.includes(service.image.image.replace('img/', ''))
    expect(imageExists).toBe(true); 
  })
})
