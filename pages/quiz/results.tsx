import { Layout } from '../../src/Components/Layout'
import { HeaderComponent } from '../../src/Components/Header'

export const ResultsPage = (): JSX.Element => {
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
