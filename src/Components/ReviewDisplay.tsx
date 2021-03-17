import styled from 'styled-components'
import { Review as IReview } from '../../cms/services'
import { StarDisplay } from './StarDisplay'

interface ReviewProps {
  data: IReview
}

const Quotation = styled.div`
  margin-top: 1rem;
  display: flex;
  width: 100%;
`

const QuoteMark = styled.div<{ side: string }>`
  flex: 1 0 2rem;
  color: ${(props) => props.theme.colours.aqua};
  font-size: 50px;
  text-align: center;
  line-height: 1;
  ${(props) => (props.side === 'left' ? 'margin-left: -1rem' : null)};
  ${(props) => (props.side === 'right' ? 'margin-right: -1rem' : null)};
`

const ReviewBody = styled.div``

const BottomContainer = styled.div`
  margin: 1rem 2rem 0 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`

const Author = styled.div`
  color: ${(props) => props.theme.colours.blue};
`

const StarContainer = styled.div`
  margin: 0.5rem;
  display: flex;
  justify-content: center;
`

export const ReviewDisplay = ({ data }: ReviewProps): JSX.Element => {
  return (
    <ReviewBody>
      {data.comment && (
        <Quotation>
          <QuoteMark side={'left'}>&ldquo;</QuoteMark>
          <blockquote>{data.comment}</blockquote>
          <QuoteMark side={'right'}>&rdquo;</QuoteMark>
        </Quotation>
      )}
      {
        <BottomContainer>
          {data.author && <Author>&#8212; {data.author}</Author>}
          {data.rating && (
            <StarContainer>
              <StarDisplay value={data.rating} outOf={5} />
            </StarContainer>
          )}
        </BottomContainer>
      }
    </ReviewBody>
  )
}
