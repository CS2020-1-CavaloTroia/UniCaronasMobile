import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";

export const Container = styled.TouchableOpacity.attrs({
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 6.0,

  elevation: 5,
})`
  background-color: ${(props) => props.background};
  width: 100%;
  margin-top: 15px;
  max-width: 600px;
  border-radius: 300px;
  padding: 0 30px;
  height: 55px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.color};
  font-size: 20px;
`;

export const Icon = styled(MaterialCommunityIcons).attrs({
  size: 28,
  color: colors.white,
})``;
