import styled from "styled-components/native";
import colors from "~/styles/colors";
import background from "~/assets/backgroundSignin.png";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export const HeaderContainer = styled.View`
  margin-left: 20px;
`;

export const ButtonHeaderIcon = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const HeaderIcon = styled(MaterialCommunityIcons).attrs((props) => {
  return {
    size: 30,
    name: props.name,
    color: colors.white,
  };
})``;

export const Background = styled.ImageBackground.attrs({ source: background })`
  width: 100%;
  height: 100%;
`;

export const Container = styled.View`
  background-color: ${`${colors.secondaryColor}DD`};
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  width: 100%;
  max-width: 400px;
`;

export const PhoneNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${colors.inactiveWhite};
  margin-bottom: 20px;
`;

export const TypeButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const TypeButton = styled.TouchableOpacity`
  width: 150px;
  margin-bottom: 40px;
  height: 150px;
  border-radius: 500px;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
`;

export const TypeButtonImage = styled.Image`
  width: 60px;
  height: 60px;
  margin-bottom: 5px;
`;

export const TypeButtonText = styled.Text`
  font-size: 16px;
  color: ${colors.secondaryColor};
`;

export const LoadingContainer = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 500px;
  align-items: center;
  justify-content: center;
  background-color: ${`${colors.black}BB`};
`;

export const UploadButtons = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 20px 0;
`;

export const UploadButtonContainer = styled.TouchableOpacity`
  align-items: center;
  width: 33%;
  padding: 0 5px;
  margin: 5px 0;
`;

export const UploadButtonContainerIcon = styled.View`
  width: 60px;
  height: 60px;
  background-color: ${colors.primaryColor};
  justify-content: center;
  align-items: center;
  border-radius: 500px;
`;

export const UploadButtonIcon = styled(AntDesign).attrs((props) => {
  return {
    size: 33,
    name: props.name,
    color: colors.secondaryColor,
  };
})``;

export const UploadButtonIcon2 = styled(MaterialCommunityIcons).attrs(
  (props) => {
    return {
      size: 37,
      name: props.name,
      color: colors.white,
    };
  }
)``;

export const UploadButtonText = styled.Text`
  margin-top: 5px;
  color: ${colors.white};
  font-size: 14px;
  font-weight: bold;
  text-align: center;
`;

export const CheckUploadContainer = styled.View`
  width: 20px;
  height: 20px;
  background-color: ${colors.success};
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  border-radius: 500px;
`;

export const CheckIcon = styled(AntDesign).attrs((props) => {
  return {
    size: 13,
    name: "check",
    color: colors.white,
  };
})``;

export const ChangeImageModalContainer = styled.View`
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 0;
  background-color: ${colors.secondaryColor};
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
    color: colors.sec,
  };
})``;

export const ChangeImageModalButtonText = styled.Text`
  color: ${colors.white};
  font-size: 16px;
  margin-top: 5px;
  font-weight: bold;
`;
