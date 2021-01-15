import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";

export const Menu = styled.TouchableOpacity`
  position: ${(props) => (props.absolute ? "absolute" : "relative")};
  top: ${(props) => (props.absolute ? 15 : 0)}px;
  left: ${(props) => (props.absolute ? 15 : 0)}px;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.secondaryColor};
  border-radius: 300px;
  margin-left: ${(props) => (props.absolute ? 0 : 15)}px;
  margin-top: ${(props) => (props.absolute ? 0 : 15)}px;
`;

export const Icon = styled(MaterialCommunityIcons).attrs({
  size: 28,
  color: colors.white,
})``;

export const Notify = styled.View`
  position: absolute;
  top: 2px;
  right: 2px;
  width: 13px;
  height: 13px;
  background-color: ${colors.primaryColor};
  border-radius: 500px;
`;
