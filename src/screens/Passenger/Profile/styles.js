import styled from "styled-components/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";

export const Container = styled.ScrollView`
  flex: 1;
  padding: 15px;
  background-color: ${colors.secondaryColor};
`;

export const PhotoContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const ChangeImageContainer = styled.TouchableOpacity`
  width: 45px;
  height: 45px;
  border-radius: 500px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primaryColor};
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const ChangeImageIcon = styled(MaterialCommunityIcons).attrs({
  size: 20,
  name: "camera",
  color: colors.white,
})``;

export const UserName = styled.Text`
  font-size: 20px;
  color: ${colors.white};
  font-weight: bold;
  margin: 15px 0;
`;

export const UserPhoto = styled.ImageBackground.attrs({
  imageStyle: { borderRadius: 500 },
})`
  width: 140px;
  height: 140px;
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

export const ChangeImageModalContainer = styled.View`
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 0;
  background-color: ${`${colors.secondaryColor}88`};
  padding: 15px;
`;

export const ChangeImageModalTitle = styled.Text`
  color: ${colors.white};
  font-weight: bold;
  font-size: 22px;
`;

export const ChangeImageModalButtons = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 15px;
`;

export const ChangeImageModalButtonContainer = styled.TouchableOpacity`
  margin-right: 30px;
  align-items: center;
`;

export const ChangeImageModalButtonIconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 500px;
  align-items: center;
  justify-content: center;
  background-color: ${`${colors.white}33`};
`;

export const ChangeImageModalButtonIcon = styled(FontAwesome).attrs((props) => {
  return {
    size: 23,
    name: props.name,
    color: colors.white,
  };
})``;

export const ChangeImageModalButtonText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  margin-top: 5px;
  font-weight: bold;
`;
