import { createContext, FC, PropsWithChildren, useState } from 'react'

import { Area } from '../../cms/services'

interface FilterContextValue {
  age: string | undefined
  ageUpdate: (input: string) => void
  formats: Array<string>
  formatUpdate: (input: string) => void
  areas: Array<Area>
  areaUpdate: (input: Area) => void
  provider: string | undefined
  providerUpdate: (input: string) => void
  clearAll: () => void
}

const defaultValueShape = {
  age: '',
  ageUpdate: () => undefined,
  formats: [''],
  formatUpdate: () => undefined,
  areas: [],
  areaUpdate: () => undefined,
  provider: '',
  providerUpdate: () => undefined,
  clearAll: () => undefined,
}

export const allAges = ['under 15', '15', '16', '17', '18', 'over 18']

export const allFormats = [
  'One to one chats',
  'Meeting a group of people',
  'Online',
  'Over the phone',
]

export const allAreas: Array<Area> = [
  'Brixton/Stockwell',
  'Brixton/Tulse Hill',
  'Clapham/Brixton Hill',
  'Norwood',
  'Streatham',
  'North Lambeth',
]

export const allProviders = ['Summer of Food and Fun 2022']

export const FilterContext =
  createContext<FilterContextValue>(defaultValueShape)

export const FilterProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [formats, setFormats] = useState<Array<string>>([])
  const [age, setAge] = useState<string | undefined>()
  const [areas, setAreas] = useState<Array<Area>>([])
  const [provider, setProvider] = useState<string | undefined>()

  function ageUpdate(input: string) {
    setAge(input)
  }

  function formatUpdate(input: string) {
    const currentItems = formats

    if (currentItems.includes(input)) {
      setFormats(currentItems.filter((item) => item !== input))
    } else {
      currentItems.push(input)
      setFormats([...currentItems])
    }
  }

  function areaUpdate(input: Area) {
    const currentItems = areas

    if (currentItems.includes(input)) {
      setAreas(currentItems.filter((item) => item !== input))
    } else {
      currentItems.push(input)
      setAreas([...currentItems])
    }
  }

  function providerUpdate(input: string) {
    setProvider(input)
  }

  function clearAll() {
    setAge(undefined)
    setFormats([])
    setProvider(undefined)
    setAreas([])
  }

  return (
    <FilterContext.Provider
      value={{
        age,
        ageUpdate,
        formats,
        formatUpdate,
        areas,
        areaUpdate,
        provider,
        providerUpdate,
        clearAll,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
