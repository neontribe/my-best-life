import styled from 'styled-components'
import { MyBestLifeTheme } from '../../src/Theme'
import { Arrow } from './Arrow'

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  align-items: center;
  padding: 0 var(--gutter-width);
`

const NavigationButton = styled.a`
  align-items: center;
  background-color: ${(props) => props.theme.colours.white};
  border-radius: 5px;
  border: 2px solid ${(props) => props.theme.colours.blue};
  color: ${(props) => props.theme.colours.blue};
  display: flex;
  font-family: 'Catamaran', sans-serif;
  font-weight: bold;
  min-height: 44px;
  min-width: 44px;
  text-decoration: none;

  &:visited {
    color: ${(props) => props.theme.colours.blue};
  }

  &:disabled {
    border: 2px solid ${(props) => props.theme.colours.grey};
    color: ${(props) => props.theme.colours.grey};
  }

  svg {
    height: 28px;
    width: 28px;
  }
`

interface NavigationProps {
  onForward(): void
  onBack(): void
  isFirstPage: boolean
  isLastPage: boolean
  page: number | null
  totalPages: number
}

export const CardListNavigation = ({
  onForward,
  onBack,
  isFirstPage,
  isLastPage,
  page,
  totalPages,
}: NavigationProps): JSX.Element => {
  return (
    <NavContainer>
      <NavigationButton
        disabled={isFirstPage}
        as="button"
        onClick={() => !isFirstPage && onBack()}
        aria-label="Previous page"
      >
        <Arrow
          direction={'left'}
          colour={
            isFirstPage
              ? MyBestLifeTheme.colours.grey
              : MyBestLifeTheme.colours.blue
          }
        />
      </NavigationButton>

      <div>{page !== null && `${page + 1} / ${totalPages}`}</div>

      <NavigationButton
        disabled={isLastPage}
        as="button"
        onClick={() => !isLastPage && onForward()}
        aria-label="Next page"
      >
        <Arrow
          direction={'right'}
          colour={
            isLastPage
              ? MyBestLifeTheme.colours.grey
              : MyBestLifeTheme.colours.blue
          }
        />
      </NavigationButton>
    </NavContainer>
  )
}
