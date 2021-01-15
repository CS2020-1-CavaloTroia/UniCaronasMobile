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
  margin-bottom: 30px;
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

export const Button = styled.TouchableOpacity.attrs({
  shadowColor: colors.black,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.1,
  shadowRadius: 6.0,

  elevation: 5,
})`
  background-color: ${(props) =>
    props.background ? props.background : colors.secondaryColor};
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
  color: ${colors.white};
  font-size: 20px;
`;

export const Icon = styled(MaterialCommunityIcons).attrs({
  size: 28,
  color: colors.white,
})``;

export const TitlePlaceForm = styled.Text`
  color: ${colors.secondaryColor};
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const ModalContainer = styled.View`
  flex: 1;
  padding: 15px;
  background-color: ${colors.white};
`;
