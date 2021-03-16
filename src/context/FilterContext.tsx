import { createContext, FC, PropsWithChildren, useState } from 'react'

interface FilterContextValue {
  age: string | undefined
  ageUpdate: (input: string) => void
  formats: Array<string>
  formatUpdate: (input: string) => void
  clearAll: () => void
}

const defaultValueShape = {
  age: '',
  ageUpdate: () => undefined,
  formats: [''],
  formatUpdate: () => undefined,
  clearAll: () => undefined,
}

export const allAges = ['<15', '15', '16', '17', '18', '18+']

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
  const [formats, setFormats] = useState<Array<string>>([])
  const [age, setAge] = useState<string | undefined>()

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

  function clearAll() {
    setAge(undefined)
    setFormats([])
  }

  return (
    <FilterContext.Provider
      value={{
        age,
        ageUpdate,
        formats,
        formatUpdate,
        clearAll,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}
