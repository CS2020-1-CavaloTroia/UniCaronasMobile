import React from 'react';
import { Container, Text } from './styles';
import colors from '~/styles/colors';
import Loading from '../Loading';

export default function Button({
  text,
  loading = false,
  loadingColor = 'primaryColor',
  background = colors.secondaryColor,
  color = colors.white,
  ...rest
}) {
  return (
    <Container background={background} {...rest}>
      {loading && <Loading color={loadingColor} />}
      {!loading && <Text color={color}>{text}</Text>}
    </Container>
  );
}
