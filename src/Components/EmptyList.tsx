import styled from 'styled-components'
import Link from 'next/link'

import { ListType } from '../Components/CardList'
import { MiniCard } from '../Components/MiniCard'
import { ServicePreview } from '../../pages/index'
import { VerticalSpacing } from './VerticalSpacing'
import Bookmark from '../Components/Bookmark'

interface EmptyListProps {
  listType: ListType
  defaultService?: ServicePreview
}

const Message = styled.div`
  width: 100%;
  padding: 0 var(--gutter-width);
  text-align: center;

  svg {
    height: 1.2em;
    stroke: ${(props) => props.theme.colours.grey};
    vertical-align: middle;
  }
`

const LinkInner = styled.a`
  font-weight: bold;
  border-bottom: 2px solid ${(props) => props.theme.colours.blue};
  text-decoration: none;
`

export const EmptyList = ({
  listType,
  defaultService,
}: EmptyListProps): JSX.Element => {
  let content: JSX.Element

  switch (listType) {
    case 'filtered':
      content = (
        <>
          <VerticalSpacing size={4} />
          <p>
            We weren&apos;t able to find any services matching your current
            filters. Try{' '}
            <Link href="/filter" passHref>
              <LinkInner>expanding your filters</LinkInner>
            </Link>{' '}
            to show more results.
          </p>
          <VerticalSpacing />
          {defaultService && (
            <>
              <p>[xXx] Or try this service that we recommend:</p>
              <VerticalSpacing size={1} />
              <MiniCard
                id={defaultService.id}
                image={defaultService.image}
                organisation={defaultService.organisation}
                shortDescription={defaultService.shortDescription}
              />
              <VerticalSpacing />
            </>
          )}
        </>
      )
      break
    case 'saved':
      content = (
        <>
          <VerticalSpacing size={4} />
          <p>
            Use the <Bookmark /> save button to add services to your saved list
            here.
          </p>
        </>
      )
      break
    case 'quiz':
      content = (
        <>
          <VerticalSpacing size={4} />
          <p>
            We weren&apos;t able to find any services matching your quiz
            answers. Please try again later, or retake the quiz with the link
            above.
          </p>
        </>
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
