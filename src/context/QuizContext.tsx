import React, { createContext, useEffect, useState } from 'react'

interface IQuizContext {
  setQuizState(state: IQuizShape): void
}

const defaultValue = {
  setQuizState: () => {},
}

export const QuizContext = createContext<IQuizContext>(defaultValue);

// Quiz provider

interface QuizProviderProps {
  children: React.ReactNode
}

interface IQuizShape {
  dummy: boolean,
}

const initialQuizState: IQuizShape = {
  dummy: true,
};

export const QuizProvider = ({ children }: QuizProviderProps): JSX.Element => {
  const getInitialQuizResults = () => {
    const ls = localStorage.getItem("quizResults");
    if (ls) {
      return JSON.parse(ls);
    }
    return initialQuizState;
  }

  const [ quizResults, setQuizResults ] = useState<IQuizShape | null>(null);

  useEffect(() => {
    // Wait until page load to use localStorage to get initial state
    setQuizResults(getInitialQuizResults());
  }, []);

  // External API for quiz context
  const setQuizState = (state: IQuizShape) => {
    setQuizResults(state);
    localStorage.setItem("quizResults", JSON.stringify(state));
  }

  const value: IQuizContext = {
    setQuizState,
  };

  return <QuizContext.Provider value={value}>
    { children }
  </QuizContext.Provider>
}
