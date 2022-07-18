/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import { Card } from '../src/Components/Card'
import 'jest-styled-components'
import { MyBestLifeTheme, GlobalStyle } from '../src/Theme'
import { ThemeProvider } from 'styled-components'
import { getServices } from '../cms/services'
import { typeOf } from 'react-is'

/*
* Pulling in the real data to test
*/

const services = getServices();

/*
* Test object to see if test fails when a object is missing a value. 
* Third object is missing shortDescription
*/
const testObj = [
  {
  "id" : 1,
  "title": "Girls Youth Club",
  "shortDescription": "Girls only youth club on Wednesday evenings",
  "costValue": 0.25
  },
  {
  "id" : 2,
  "title": "Girls Youth Club",
  "shortDescription": "Girls only youth club on Wednesday evenings",
  "costValue": 0.25
  },
  {
  "id" : 3,
  "title": "Girls Youth Club",
  "costValue": 0.25
  }
]

it('Card component test', () => {

  /*
  * service - real data
  * testObj - dummy data
  * Switch between the two objects above to confirm the test runs correctly
  */
  testObj.map((service) => {
    const { container } = render(
      <ThemeProvider theme={MyBestLifeTheme}>
        <GlobalStyle />
        <Card
          key={service.id}
          id={service.id}
          title={service.title}
          shortDescription={service.shortDescription}
          costValue={service.costValue}
        />
      </ThemeProvider>
    )

    const title               = container.querySelector('p').textContent;
    const shortDescription    = container.querySelector('h2 a').textContent;
    const costValue           = container.querySelector('div:nth-of-type(2) > div').textContent;

    console.log( typeOf(testObj) )

    expect(title).toBeTruthy()
    expect(shortDescription).toBeTruthy()
    expect(costValue).toBeTruthy()
  })
})
