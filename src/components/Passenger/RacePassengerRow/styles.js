import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";

export const Container = styled.View`
  width: 100%;
  height: 100px;
  background-color: ${colors.white}25;
  border-radius: 5px;
  margin-top: 15px;
  padding: 0 10px;
  flex-direction: row;
`;

export const LeftButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
`;

export const RightButton = styled.TouchableOpacity`
  width: 25%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-left-color: ${colors.white}55;
  border-left-width: 1px;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.white}DD;
`;

export const Subtitle = styled.Text`
  font-size: 12px;
  color: ${colors.white}AA;
`;

export const CancelText = styled.Text`
  font-size: 12px;
  color: ${colors.white};
`;

export const CancelIcon = styled(MaterialCommunityIcons).attrs({
  name: "cancel",
  size: 28,
  color: colors.white,
})``;

export const IconText = styled(MaterialCommunityIcons).attrs((props) => {
  return {
    name: props.name,
    size: 16,
    color: colors.white,
  };
})``;
