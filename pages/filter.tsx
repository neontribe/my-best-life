import { useContext } from 'react'
import { NextPage } from 'next'
import styled from 'styled-components'

import { Layout } from '../src/Components/Layout'
import { HeaderComponent } from '../src/Components/Header'
import { Checkbox } from '../src/Components/Checkbox'
import { RadioButton } from '../src/Components/RadioButton'
import {
  FilterContext,
  allAges,
  allCategories,
  allFormats,
} from '../src/context/FilterContext'

const Top = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  display: flex;
  justify-content: space-between;
  margin: 1rem;
  padding: 1rem 0;

  h2 {
    font-family: 'Catamaran', sans-serif;
    font-size: ${(props) => props.theme.fontSizes.title};
  }

  button {
    color: ${(props) => props.theme.colours.purple};
    background-color: transparent;
    border: none;
    border-bottom: 1px solid ${(props) => props.theme.colours.purple};

    &:focus {
      outline: 2px dashed ${(props) => props.theme.colours.blue};
      outline-offset: 4px;
    }

    &:hover {
      background-color: ${(props) => props.theme.colours.purple_light};
      transition: 0.3s;
    }
  }
`

const FilterSection = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.colours.yellow};
  margin: 1rem;
  padding: 1rem 0;

  h3 {
    font-size: ${(props) => props.theme.fontSizes.heading};
  }
`

const CheckboxGroup = styled.div`
  margin: 1rem 0;
`

const HorizontalGroup = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
`

export const FilterPage: NextPage = () => {
  const {
    age,
    ageUpdate,
    categories,
    categoryUpdate,
    formats,
    formatUpdate,
    clearAll,
  } = useContext(FilterContext)

  return (
    <Layout>
      <HeaderComponent />
      <Top>
        <h2>Filter</h2>
        <button onClick={() => clearAll()}>Clear All</button>
      </Top>
      <FilterSection>
        <h3>Age</h3>
        <p>Select your age so we can tell you what you are eligible for</p>
        <HorizontalGroup>
          {allAges.map((item) => {
            return (
              <RadioButton
                key={item}
                label={item}
                name={'age'}
                checked={item === age}
                onChange={ageUpdate}
              />
            )
          })}
        </HorizontalGroup>
      </FilterSection>
      <FilterSection>
        <h3>Category</h3>
        <CheckboxGroup>
          {allCategories.map((category) => {
            return (
              <Checkbox
                key={category}
                label={category}
                checked={categories.includes(category)}
                onChange={categoryUpdate}
              />
            )
          })}
        </CheckboxGroup>
      </FilterSection>
      {/* <FilterSection>
        <h3>Cost</h3>
      </FilterSection> */}
      <FilterSection>
        <h3>Format of Support / Activity</h3>
        <CheckboxGroup>
          {allFormats.map((format) => {
            return (
              <Checkbox
                key={format}
                label={format}
                checked={formats.includes(format)}
                onChange={formatUpdate}
              />
            )
          })}
        </CheckboxGroup>
      </FilterSection>
    </Layout>
  )
}

export default FilterPage
