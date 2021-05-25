import React, {
  createContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from 'react'

import { Gender, Interest } from '../../cms/services'
import { Feeling } from '../../pages/quiz/how-are-you-feeling'
import { OnMind } from '../../pages/quiz/whats-on-your-mind'

// We store checkbox inputs (and anything else that can be toggled)
// using this structure. If a checkbox is checked, its id is present in
// the array; if it is unchecked, it is not present.
interface FullData {
  whatsOnMind: Array<OnMind>
  howAreFeeling: Array<Feeling>
  interests: Array<Interest>
  gender: Array<Gender>
  age: string
}

interface IQuizContext {
  whatsOnMindGet(key: OnMind): boolean
  whatsOnMindToggle(key: OnMind): void
  howAreFeelingGet(key: Feeling): boolean
  howAreFeelingToggle(key: Feeling): void
  interestsGet(key: Interest): boolean
  interestsToggle(key: Interest): void
  genderGet(key: Gender): boolean
  genderToggle(key: Gender): void
  ageGet(): string
  ageSet(val: string): void
  fullDataGet(): FullData | undefined
  clearProgress(): void
  quizComplete: boolean
  setQuizComplete(val: boolean): void
}

const defaultValue = {
  whatsOnMindGet: () => false,
  whatsOnMindToggle: () => undefined,
  howAreFeelingGet: () => false,
  howAreFeelingToggle: () => undefined,
  interestsGet: () => false,
  interestsToggle: () => undefined,
  genderGet: () => false,
  genderToggle: () => undefined,
  ageGet: () => '',
  ageSet: () => undefined,
  fullDataGet: () => undefined,
  clearProgress: () => undefined,
  quizComplete: false,
  setQuizComplete: () => undefined,
}

export const QuizContext = createContext<IQuizContext>(defaultValue)

// Quiz provider

interface QuizProviderProps {
  children: React.ReactNode
}

export const QuizProvider = ({ children }: QuizProviderProps): JSX.Element => {
  const [whatsOnMind, setWhatsOnMind] = useState<Array<OnMind>>([])
  const [howAreFeeling, setHowAreFeeling] = useState<Array<Feeling>>([])
  const [interests, setInterests] = useState<Array<Interest>>([])
  const [gender, setGender] = useState<Array<Gender>>([])
  const [age, setAge] = useState<string>('')
  const [quizComplete, setQuizComplete] = useState(false)

  interface GenericGetter {
    <T>(key: string, defaultVal: T): T
  }

  const getFromLocalStorage: GenericGetter = (key, defaultVal) => {
    const val = localStorage.getItem(key)
    if (val) {
      return JSON.parse(val)
    } else {
      return defaultVal
    }
  }

  useEffect(() => {
    // Wait until page load to use localStorage to get initial state
    setWhatsOnMind(getFromLocalStorage('quiz/whatsOnMind', []))
    setHowAreFeeling(getFromLocalStorage('quiz/howAreFeeling', []))
    setInterests(getFromLocalStorage('quiz/interests', []))
    setGender(getFromLocalStorage('quiz/gender', []))
    setAge(getFromLocalStorage('quiz/age', ''))
    setQuizComplete(getFromLocalStorage('quiz/complete', false))
  }, [])

  interface GenericSetter {
    <T>(key: string, newVal: T): void
  }

  const setInLocalStorage: GenericSetter = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  useEffect(() => {
    setInLocalStorage('quiz/whatsOnMind', whatsOnMind)
  }, [whatsOnMind])

  useEffect(() => {
    setInLocalStorage('quiz/howAreFeeling', howAreFeeling)
  }, [howAreFeeling])

  useEffect(() => {
    setInLocalStorage('quiz/interests', interests)
  }, [interests])

  useEffect(() => {
    setInLocalStorage('quiz/gender', gender)
  }, [gender])

  useEffect(() => {
    setInLocalStorage('quiz/age', age)
  }, [age])

  useEffect(() => {
    setInLocalStorage('quiz/complete', quizComplete)
  }, [quizComplete])

  //
  // External API for quiz context.
  //

  const clearProgress = useCallback(() => {
    setWhatsOnMind([])
    setHowAreFeeling([])
    setInterests([])
    setAge('')
    setGender([])
    setQuizComplete(false)
  }, [
    setWhatsOnMind,
    setHowAreFeeling,
    setInterests,
    setAge,
    setGender,
    setQuizComplete,
  ])

  interface CategoryToggler {
    <T>(
      setStateFunc: React.Dispatch<React.SetStateAction<Array<T>>>,
      key: T
    ): void
  }

  // This function generalises a way of storing checkbox inputs. It is generalised to any state that stores
  // a value of type Array.
  const toggleCategoryValue: CategoryToggler = useCallback(
    (setStateFunc, key) => {
      setStateFunc((cur) => {
        if (cur === null) return cur

        const idx = cur.indexOf(key)
        const isSet = idx > -1
        if (isSet) {
          cur.splice(idx, 1)
        } else {
          cur.push(key)
        }

        return [...cur]
      })
    },
    []
  )

  interface CategoryValueGetter {
    <T>(category: Array<T>, key: T): boolean
  }

  const getCategoryValue: CategoryValueGetter = useCallback((category, key) => {
    return category.includes(key)
  }, [])

  // Have to memoize this to prevent infinite useEffect loops with anything
  // that uses this result as a dependency.
  const fullData = useMemo(
    (): FullData => ({
      howAreFeeling,
      whatsOnMind,
      interests,
      gender,
      age,
    }),
    [howAreFeeling, whatsOnMind, interests, gender, age]
  )

  const value: IQuizContext = useMemo(
    () => ({
      howAreFeelingGet: (key) => getCategoryValue(howAreFeeling, key),
      whatsOnMindGet: (key) => getCategoryValue(whatsOnMind, key),
      interestsGet: (key) => getCategoryValue(interests, key),
      genderGet: (key) => getCategoryValue(gender, key),
      howAreFeelingToggle: (key) => toggleCategoryValue(setHowAreFeeling, key),
      whatsOnMindToggle: (key) => toggleCategoryValue(setWhatsOnMind, key),
      interestsToggle: (key) => toggleCategoryValue(setInterests, key),
      genderToggle: (key) => toggleCategoryValue(setGender, key),
      ageGet: () => age,
      ageSet: setAge,
      fullDataGet: () => fullData,
      clearProgress,
      quizComplete,
      setQuizComplete,
    }),
    [
      getCategoryValue,
      toggleCategoryValue,
      howAreFeeling,
      whatsOnMind,
      interests,
      gender,
      age,
      setHowAreFeeling,
      setWhatsOnMind,
      setInterests,
      setGender,
      setAge,
      clearProgress,
      quizComplete,
      setQuizComplete,
      fullData,
    ]
  )

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
