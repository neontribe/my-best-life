import React from 'react'
import styled from 'styled-components'

interface VerticalSpacingProps {
  size?: number
}

const Spacing = styled.div`
  margin: ${(props: VerticalSpacingProps) => (props.size ? props.size : 2)}rem 0;
`

export const VerticalSpacing = ({
  size,
}: VerticalSpacingProps): JSX.Element => {
  return <Spacing size={size} />
}
