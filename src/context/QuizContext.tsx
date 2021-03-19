import React, { createContext, useEffect, useState } from 'react'

// We store checkbox inputs (and anything else that can be toggled)
// using this structure. If a checkbox is checked, its id is present in
// the array; if it is unchecked, it is not present.
type CategoryList = Array<string>

interface IAboutYou {
  age: string
  genderPreference: string
}

interface AboutYouUpdater {
  (old: IAboutYou): IAboutYou
}

interface FullData {
  whatsOnMind: CategoryList
  howAreFeeling: CategoryList
  interests: CategoryList
  aboutYou: IAboutYou
}

interface IQuizContext {
  whatsOnMindGet(key: string): boolean
  whatsOnMindToggle(key: string): void
  howAreFeelingGet(key: string): boolean
  howAreFeelingToggle(key: string): void
  interestsGet(key: string): boolean
  interestsToggle(key: string): void
  aboutYou: IAboutYou
  aboutYouUpdate(updateFunc: AboutYouUpdater): void
  fullDataGet(): FullData | undefined
  clearProgress(): void
  quizComplete: boolean
  setQuizComplete(val: boolean): void
}

const aboutYouDefault: IAboutYou = {
  age: '',
  genderPreference: '',
}

const defaultValue = {
  whatsOnMindGet: () => false,
  whatsOnMindToggle: () => undefined,
  howAreFeelingGet: () => false,
  howAreFeelingToggle: () => undefined,
  interestsGet: () => false,
  interestsToggle: () => undefined,
  aboutYou: aboutYouDefault,
  aboutYouUpdate: () => undefined,
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
  const [whatsOnMind, setWhatsOnMind] = useState<CategoryList>([])
  const [howAreFeeling, setHowAreFeeling] = useState<CategoryList>([])
  const [interests, setInterests] = useState<CategoryList>([])
  const [aboutYou, setAboutYou] = useState<IAboutYou>(aboutYouDefault)
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
    setAboutYou(getFromLocalStorage('quiz/aboutYou', aboutYouDefault))
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
    setInLocalStorage('quiz/aboutYou', aboutYou)
  }, [aboutYou])

  //
  // External API for quiz context.
  //

  const clearProgress = () => {
    setWhatsOnMind([])
    setHowAreFeeling([])
    setInterests([])
    setAboutYou(aboutYouDefault)
    setQuizComplete(false)
  }

  interface CategoryToggler {
    (
      setStateFunc: React.Dispatch<React.SetStateAction<CategoryList>>,
      key: string
    ): void
  }

  // This function generalises a way of storing checkbox inputs. It is generalised to any state that stores
  // a value of type CategoryList.
  const toggleCategoryValue: CategoryToggler = (setStateFunc, key) => {
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
  }

  const getCategoryValue = (category: CategoryList, key: string): boolean => {
    return category.includes(key)
  }

  const value: IQuizContext = {
    howAreFeelingGet: (key) => getCategoryValue(howAreFeeling, key),
    whatsOnMindGet: (key) => getCategoryValue(whatsOnMind, key),
    interestsGet: (key) => getCategoryValue(interests, key),
    aboutYou,
    howAreFeelingToggle: (key) => toggleCategoryValue(setHowAreFeeling, key),
    whatsOnMindToggle: (key) => toggleCategoryValue(setWhatsOnMind, key),
    interestsToggle: (key) => toggleCategoryValue(setInterests, key),
    aboutYouUpdate: setAboutYou,
    fullDataGet: () => ({
      howAreFeeling,
      whatsOnMind,
      interests,
      aboutYou,
    }),
    clearProgress,
    quizComplete,
    setQuizComplete,
  }

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
}
