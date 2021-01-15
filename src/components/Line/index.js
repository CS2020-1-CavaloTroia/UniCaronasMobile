import React from 'react';
import { Container, Line } from './styles';

export default function LineComponent({
  alignment = 'center', // center left right
  width = '100%',
  marginTop = '10px',
  marginBottom = '10px',
  color = 'black',
  weight = '2px',
}) {
  return (
    <Container
      alignment={alignment}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <Line width={width} color={color} weight={weight} />
    </Container>
  );
}
