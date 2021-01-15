import styled from 'styled-components/native';
import loading from '~/assets/loading.gif';

export const LoadImage = styled.Image.attrs((props) => {
  return {
    source: loading,
  };
})`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
`;
