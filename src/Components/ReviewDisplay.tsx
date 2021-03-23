import styled from 'styled-components'
import { Review as IReview } from '../../cms/services'
import { StarDisplay } from './StarDisplay'
import { Quotation } from './Quotation'

interface ReviewProps {
  data: IReview
}

const ReviewBody = styled.div`
  margin-bottom: 2rem;
`

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
      {data.comment && <Quotation>{data.comment}</Quotation>}
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
