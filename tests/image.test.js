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

const testObj = [
  {
    "title": "one",
    "image": { "image": 'img/we-rise-projects.jpg', "imageAlt": 'A group of young people' },
  },
  {
    "title": "two",
    "image": { "image": 'img/we-rise-projects.jpg', "imageAlt": 'A group of young people' },
  }
]

const images = getImages()
const services = getServices()

it('Services images exist', () => {
  services.map((service) => {

    /* Ensure only markdowns with image property are tested */
    if ( service.hasOwnProperty('image') ) {

      const image = service.image.image.replace("img/", "")
      const imageExists = images.includes(image)
    
      expect(imageExists).toBe(true)

    }

  })
})
