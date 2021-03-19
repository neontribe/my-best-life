import { useContext } from 'react'

import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'
import { QuizContext } from '../../src/context/QuizContext'

export const ResultsPage = (): JSX.Element => {
  const { fullDataGet } = useContext(QuizContext)

  // eslint-disable-next-line
  console.log(fullDataGet())

  return (
    <Layout>
      <HeaderComponent
        title="Results"
        homeButton={false}
        filterButton={false}
      />
    </Layout>
  )
}

export default ResultsPage
