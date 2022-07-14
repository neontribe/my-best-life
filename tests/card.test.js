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

/*
  id: string
  organisation: string
  title: string
  shortDescription: string
  description: string
  interests: Array<Interest>
  feelings: Array<string>
  costValue: number
  costExplanation: string
  format: Formats
*/

const services = getServices();

it('Card component test', () => {
  services.map((service) => {
    const { container } = render(
      <ThemeProvider theme={MyBestLifeTheme}>
        <GlobalStyle />
        <Card
          key={service.id}
          id={service.id}
          title={service.title}
          shortDescription={service.description}
          image={service.image}
          costValue={service.costValue}
          costQualifier={service.costQualifier}
          age={service.age}
          format={service.format}
        />
      </ThemeProvider>
    )

    const description = container.querySelector('h2').textContent
    const title = container.querySelector('p').textContent
    const img = container.querySelector('img').getAttribute('src')
    const costValue = container.querySelector(
      'div:nth-of-type(2) > div'
    ).textContent

    expect(title).toBeTruthy()
    expect(description).toBeTruthy()
    expect(img).toBeTruthy()
    expect(costValue).toBeTruthy()
  })
})
