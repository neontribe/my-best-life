import styled from 'styled-components'

interface QuotationProps {
  children: string
}

const QuotationContainer = styled.div`
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

export const Quotation = ({ children: quote }: QuotationProps): JSX.Element => {
  return (
    <QuotationContainer>
      <QuoteMark side={'left'}>&ldquo;</QuoteMark>
      <blockquote>{quote}</blockquote>
      <QuoteMark side={'right'}>&rdquo;</QuoteMark>
    </QuotationContainer>
  )
}
