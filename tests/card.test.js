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
 * Pulling in the real data to test
 */

const services = getServices()

/*
 * Test object to see if test fails when a object is missing a value.
 * Third object is missing shortDescription
 */

it('Card component test', () => { 
  /*
   * service - real data
   * testObj - dummy data
   * Switch between the two objects above to confirm the test runs correctly
   */
  services.map((service) => {
    const { container } = render(
      <ThemeProvider theme={MyBestLifeTheme}>
        <GlobalStyle />
        <Card
          key={service.id}
          id={service.id}
          title={service.title}
          shortDescription={service.shortDescription}
          costValue={service.costValue}
          image={service.image}
        />
      </ThemeProvider>
    )

    const shortDescription = container.querySelector('p').textContent
    const title = container.querySelector('h2 a').textContent
    const costValue = container.querySelector(
      'div:nth-of-type(2) > div'
    ).textContent

    expect(shortDescription).toBeTruthy();
    expect(title).toBeTruthy();
    expect(costValue).toBeTruthy();
  })
})
