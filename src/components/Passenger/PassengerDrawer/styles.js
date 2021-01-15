import styled from "styled-components/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";

export const Container = styled.ScrollView`
  width: 280px;
  padding: 15px;
  background-color: ${colors.secondaryColor};
`;

export const HeaderButtons = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  border-radius: 500px;
  background-color: ${`${colors.white}22`};
  align-items: center;
  justify-content: center;
`;

export const HeaderButtonEdit = styled(MaterialCommunityIcons).attrs(
  (props) => {
    return {
      size: 20,
      name: "pencil",
      color: colors.white,
    };
  }
)``;

export const HeaderButtonConfig = styled(FontAwesome).attrs((props) => {
  return {
    size: 20,
    name: "cog",
    color: colors.white,
  };
})``;

export const PhotoContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const UserName = styled.Text`
  font-size: 18px;
  color: ${colors.white};
  font-weight: bold;
  margin: 15px 0;
`;

export const ProfileImage = styled.Image`
  width: 140px;
  height: 140px;
  border-radius: 500px;
`;

export const NoProfileImageContainer = styled.View`
  width: 140px;
  height: 140px;
  border-radius: 500px;
  background-color: ${colors.white}33;
  align-items: center;
  justify-content: center;
`;

export const NoProfileImageIcon = styled(MaterialCommunityIcons).attrs({
  size: 100,
  name: "account",
  color: `${colors.white}66`,
})``;

export const NavigationButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${(props) =>
    props.active ? colors.primaryColor : `${colors.white}11`};
  height: 60px;
  border-radius: 10px;
  margin-top: 10px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 15px;
  align-items: center;
`;

export const NavigationButtonText = styled.Text`
  font-size: 18px;
  color: ${(props) => (props.active ? colors.secondaryColor : colors.white)};
`;

export const Icon = styled(MaterialCommunityIcons).attrs((props) => {
  return {
    size: 28,
    color: props.active ? colors.secondaryColor : colors.white,
  };
})``;
