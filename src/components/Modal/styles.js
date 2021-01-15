import styled from "styled-components/native";
import Modal from "react-native-modal";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";

export const ModalContainer = styled(Modal)`
  align-items: center;
  justify-content: center;
  margin: 0;
`;

export const Container = styled.View`
  width: 85%;
  height: 400px;
  background-color: ${colors.secondaryColor};
  align-items: center;
  padding: 20px;
  border-radius: 10px;
`;

export const IconContainer = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 500px;
  background-color: ${colors.white}22;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(MaterialCommunityIcons).attrs((props) => {
  return {
    size: 80,
    color: `${colors.white}77`,
  };
})``;

export const Title = styled.Text`
  font-size: 28px;
  color: ${colors.white}77;
  text-align: center;
  font-weight: bold;
  margin-top: 20px;
`;

export const Message = styled.Text`
  font-size: 18px;
  color: ${colors.white};
  text-align: center;
  margin-top: 5px;
`;

export const Button = styled.TouchableOpacity`
  margin-top: 40px;
  width: 75%;
  height: 50px;
  background-color: ${colors.primaryColor};
  justify-content: center;
  align-items: center;
  border-radius: 500px;
`;

export const TextButton = styled.Text`
  color: ${colors.white};
  font-size: 18px;
`;
