import {
  createContext,
  FC,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react'

interface SaveContextValue {
  saved: Array<string>
  savedUpdate: (input: string) => boolean
}

const defaultValueShape = {
  saved: [''],
  savedUpdate: () => false,
}

export const SaveContext = createContext<SaveContextValue>(defaultValueShape)

export const SaveProvider: FC<PropsWithChildren<any>> = ({ children }) => {
  const [saved, setSaved] = useState<Array<string>>([])

  useEffect(() => {
    // Attempt to retrieve the showWelcome value from local storage
    const stored = window.localStorage.getItem('saved')

    // If it's been correctly set to false, update state
    if (stored) {
      setSaved(JSON.parse(stored))
    }
  }, [])

  function savedUpdate(input: string): boolean {
    const currentItems = saved

    if (currentItems.includes(input)) {
      window.localStorage.setItem(
        'saved',
        JSON.stringify(currentItems.filter((item) => item !== input))
      )
      setSaved(currentItems.filter((item) => item !== input))
      return false
    } else {
      currentItems.push(input)
      window.localStorage.setItem('saved', JSON.stringify(currentItems))
      setSaved([...currentItems])
      return true
    }
  }

  return (
    <SaveContext.Provider
      value={{
        saved,
        savedUpdate,
      }}
    >
      {children}
    </SaveContext.Provider>
  )
}
