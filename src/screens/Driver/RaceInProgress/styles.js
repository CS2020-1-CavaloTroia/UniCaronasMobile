import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Fontisto from "react-native-vector-icons/Fontisto";
import colors from "~/styles/colors";
import MapView from "react-native-maps";

export const Container = styled.View`
  flex: 1;
`;

export const Map = styled(MapView)`
  flex: 1;
`;

export const InformationsContainer = styled.View`
  height: 350px;
  width: 100%;
`;

export const InformationsScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    padding: 15,
  },
})`
  width: 100%;
  height: 100%;
  background-color: ${colors.secondaryColor};
`;

export const Title = styled.Text`
  color: ${colors.white};
  font-size: 26px;
  margin-bottom: 10px;
`;

export const Text = styled.Text`
  color: ${colors.white};
  font-size: 20px;
  margin-top: 5px;
`;

export const Icon = styled(MaterialCommunityIcons).attrs((props) => {
  return {
    size: 20,
    color: colors.white,
  };
})``;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: ${(props) =>
    props.color ? props.color : `${colors.white}33`};
  margin-top: 15px;
  align-items: center;
  flex-direction: row;
  padding: 0 30px;
  border-radius: 50px;
  justify-content: space-between;
`;

export const ButtonText = styled.Text`
  font-size: 24px;
  color: ${colors.white};
`;

export const MotoIcon = styled(Fontisto).attrs({
  name: "motorcycle",
  size: 30,
  color: colors.white,
})``;

export const CancelIcon = styled(MaterialCommunityIcons).attrs({
  name: "cancel",
  size: 30,
  color: colors.white,
})``;

export const FinishIcon = styled(MaterialCommunityIcons).attrs({
  name: "map-marker-check",
  size: 30,
  color: colors.white,
})``;
