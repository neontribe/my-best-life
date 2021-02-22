import { createContext, FC, PropsWithChildren, useState } from 'react'

interface FilterContextValue {
  age: string | undefined
  ageUpdate: (input: string) => void
  categories: Array<string>
  categoryUpdate: (input: string) => void
  formats: Array<string>
  formatUpdate: (input: string) => void
  clearAll: () => void
}

const defaultValueShape = {
  age: '',
  ageUpdate: () => undefined,
  categories: [''],
  categoryUpdate: () => undefined,
  formats: [''],
  formatUpdate: () => undefined,
  clearAll: () => undefined,
}

export const allAges = ['<15', '15', '16', '17', '18', '18+']

export const allCategories = [
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

export const allFormats = [
  'One to one chats',
  'Meeting a group of people',
  'Online',
  'Over the phone',
]

export const FilterContext = createContext<FilterContextValue>(
  defaultValueShape
)

export const FilterProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [categories, setCategories] = useState<Array<string>>([])
  const [formats, setFormats] = useState<Array<string>>([])
  const [age, setAge] = useState<string | undefined>()

  function ageUpdate(input: string) {
    setAge(input)
  }

  function categoryUpdate(input: string) {
    const currentItems = categories

    if (currentItems.includes(input)) {
      setCategories(currentItems.filter((item) => item !== input))
    } else {
      currentItems.push(input)
      setCategories([...currentItems])
    }
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

  function clearAll() {
    setAge(undefined)
    setCategories([])
    setFormats([])
  }

  return (
    <FilterContext.Provider
      value={{
        age,
        ageUpdate,
        categories,
        categoryUpdate,
        formats,
        formatUpdate,
        clearAll,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
