import styled from "styled-components/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
})`
  flex: 1;
  background-color: ${colors.secondaryColor};
`;

export const PhotoContainer = styled.View`
  width: 100%;
  align-items: center;
  padding-top: 30px;
`;

export const Content = styled.View`
  padding: 0 15px;
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
  margin-top: 15px;
`;

export const PhoneNumberText = styled.Text`
  font-size: 16px;
  color: ${`${colors.white}88`};
  font-weight: bold;
  margin-bottom: 15px;
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

export const StarContainer = styled.View`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
`;

export const StarAbsoluteContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const UserRating = styled.View`
  width: 100%;
  align-items: center;
`;

export const StarsContainer = styled.View`
  width: auto;
  flex-direction: row;
  justify-content: center;
`;

export const ProfileStatusMessage = styled.Text`
  color: ${colors.warning};
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

export const HorizontalScroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  showsHorizontalScrollIndicator: false,
  horizontal: true,
  // contentInsetAdjustmentBehavior: 'never',
  contentContainerStyle: {
    //flexGrow: 1,
    //backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 20,
  },
})`
  margin-top: 20px;
`;

export const ScreenButton = styled.TouchableOpacity`
  margin: 0 15px;
`;

export const ScreenText = styled.Text`
  color: ${(props) => (props.active ? colors.white : `${colors.white}55`)};
  font-size: 20px;
  font-weight: bold;
`;
