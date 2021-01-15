import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";
import MapView from "react-native-maps";

export const Container = styled.View`
  flex: 1;
`;

export const Map = styled(MapView)`
  flex: 1;
`;

export const Header = styled.View`
  position: absolute;
  width: 100%;
  top: 0;
`;

export const BottomButtons = styled.View`
  width: 100%;
  padding: 15px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
`;

export const TargetButton = styled.TouchableOpacity.attrs({
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 6.0,

  elevation: 5,
})`
  background-color: ${colors.white};
  border-radius: 300px;
  height: 40px;
  width: 40px;
  align-items: center;
  justify-content: center;
  border: 2px solid ${colors.secondaryColor};
`;

export const TargetButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export const TargetIcon = styled(MaterialCommunityIcons).attrs({
  name: "target",
  size: 28,
  color: colors.secondaryColor,
})``;

export const MessageContainer = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) =>
    props.background ? props.background : colors.info};
  padding: 5px 0;
`;

export const Message = styled.Text`
  color: ${colors.white};
  text-align: center;
`;
