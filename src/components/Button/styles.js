import styled from 'styled-components/native';
import colors from '~/styles/colors';

export const Container = styled.TouchableOpacity`
  margin: 20px 0 0 0;
  padding: 10px 20px;
  background-color: ${(props) => props.background};
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-size: 18px;
  color: ${(props) => props.color};
`;
