import styled from 'styled-components'

import { ListType } from '../Components/CardList'

interface EmptyListProps {
  listType: ListType
}

const Message = styled.p`
  width: 100%;
  padding: 4rem;
  text-align: center;

  svg {
    height: 1.2em;
    stroke: ${(props) => props.theme.colours.grey};
    vertical-align: middle;
  }
`

export const EmptyList = ({ listType }: EmptyListProps): JSX.Element => {
  let content: JSX.Element

  switch (listType) {
    case 'filtered':
      content = (
        <span>
          We weren&apos;t able to find any services matching your current
          filters. Try expanding your filters to show more results.
        </span>
      )
      break
    case 'saved':
      content = (
        <span>
          Use the{' '}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            />
          </svg>{' '}
          save button to add services to your saved list here.
        </span>
      )
      break
    case 'quiz':
      content = (
        <span>
          We weren&apos;t able to find any services matching your quiz answers.
          Please try again later, or retake the quiz with the link above.
        </span>
      )
      break
    default:
      content = (
        <span>
          There aren&apos;t any results available at the moment, please try
          again later.
        </span>
      )
  }

  return <Message>{content}</Message>
}
