import React, { useState } from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'

import { Layout } from '../src/Components/Layout'
import { HeaderComponent } from '../src/Components/Header'
import { Checkbox } from '../src/Components/Checkbox'

const Top = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem 0;

  h2 {
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.title};

    &:after {
      content: 'F';
    }
  }

  button {
    color: ${(props) => props.theme.colours.purple};
  }
`

const FilterSection = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  margin: 1rem;
  padding: 1rem 0;

  h3 {
    font-size: ${(props) => props.theme.fontSizes.highlight};
    margin-bottom: 1rem;
  }
`

export const FilterPage: NextPage = () => {
  const categories = [
    'Money',
    'School and College',
    'Sex and Relationships',
    'Mental Health',
    'Keeping Safe',
    'Job Stuff',
    "Where I'm Living",
    'Friends',
    'Family',
    'Drink and Drugs',
    'My Body',
    'My Rights and the Law',
  ]

  const formats = [
    'One to one chats',
    'Meeting a group of people',
    'Online',
    'Over the phone',
  ]

  const [checkedCategories, setCheckedCategories] = useState(categories)
  const [checkedFormats, setCheckedFormats] = useState(formats)

  function handleCategoryUpdate(input: string) {
    const currentItems = checkedCategories

    if (currentItems.includes(input)) {
      setCheckedCategories(currentItems.filter((item) => item !== input))
    } else {
      currentItems.push(input)
      setCheckedCategories(currentItems)
    }
  }

  function handleFormatUpdate(input: string) {
    const currentItems = checkedFormats

    if (currentItems.includes(input)) {
      setCheckedFormats(currentItems.filter((item) => item !== input))
    } else {
      currentItems.push(input)
      setCheckedFormats(currentItems)
    }
  }

  return (
    <Layout>
      <HeaderComponent />
      <Top>
        <h2>Filter</h2>
        <button>Clear All</button>
      </Top>
      {/* <FilterSection>
        <h3>Age</h3>
      </FilterSection> */}
      <FilterSection>
        <h3>Category</h3>
        {categories.map((category) => {
          return (
            <Checkbox
              key={category}
              label={category}
              checked={checkedCategories.includes(category)}
              onChange={handleCategoryUpdate}
            />
          )
        })}
      </FilterSection>
      {/* <FilterSection>
        <h3>Cost</h3>
      </FilterSection> */}
      <FilterSection>
        <h3>Format of Support / Activity</h3>
        {formats.map((format) => {
          return (
            <Checkbox
              key={format}
              label={format}
              checked={checkedFormats.includes(format)}
              onChange={handleFormatUpdate}
            />
          )
        })}
      </FilterSection>
    </Layout>
  )
}

export default FilterPage
