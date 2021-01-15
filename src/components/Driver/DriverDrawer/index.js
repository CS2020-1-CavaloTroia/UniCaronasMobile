import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";

import { signout } from "~/store/modules/auth/actions";

import {
  Container,
  HeaderButtons,
  HeaderButton,
  HeaderButtonConfig,
  PhotoContainer,
  ProfileImage,
  UserName,
  NoProfileImageIcon,
  NoProfileImageContainer,
  NavigationButton,
  NavigationButtonText,
  Icon,
  Notify,
} from "./styles";

export default function DriverDrawer({ activeItemIndex, navigation }) {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.name);
  const inProgressRace = useSelector((state) => state.driver.inProgressRace);
  const profileStatus = useSelector((state) => state.auth.profileStatus);
  const thumbnail = useSelector((state) => state.auth.thumbnail);

  const renderProfileImage = () => {
    if (thumbnail) return <ProfileImage source={{ uri: thumbnail }} />;

    return (
      <NoProfileImageContainer>
        <NoProfileImageIcon />
      </NoProfileImageContainer>
    );
  };

  return (
    <Container>
      <HeaderButtons>
        <HeaderButton
          onPress={() => {
            navigation.navigate("Profile");
            navigation.closeDrawer();
          }}
        >
          <HeaderButtonConfig />
          {profileStatus !== "free" && <Notify />}
        </HeaderButton>
      </HeaderButtons>
      <PhotoContainer>
        {renderProfileImage()}
        <UserName>{userName}</UserName>
      </PhotoContainer>
      <NavigationButton
        onPress={() => {
          navigation.navigate("Map");
          navigation.closeDrawer();
        }}
        active={activeItemIndex === 0}
      >
        <NavigationButtonText active={activeItemIndex === 0}>
          Mapa
        </NavigationButtonText>
        <Icon active={activeItemIndex === 0} name="map-marker-radius" />
      </NavigationButton>

      {/* <NavigationButton
        onPress={() => {
          navigation.navigate("AwaitingRaces", {
            filter: "awaiting",
          });
          navigation.closeDrawer();
        }}
        active={activeItemIndex === 1}
      >
        <NavigationButtonText active={activeItemIndex === 1}>
          Corridas em espera
        </NavigationButtonText>
        <Icon active={activeItemIndex === 1} name="clock-outline" />
      </NavigationButton>

      {inProgressRace && inProgressRace.length > 0 && (
        <NavigationButton
          onPress={() => {
            navigation.navigate("RaceInProgress");
            navigation.closeDrawer();
          }}
          active={activeItemIndex === 2}
        >
          <NavigationButtonText active={activeItemIndex === 2}>
            Corrida em progresso
          </NavigationButtonText>
          <Icon active={activeItemIndex === 2} name="map-marker-distance" />
        </NavigationButton>
      )} */}

      {/*<NavigationButton
        onPress={() => {
          navigation.navigate('AllRaces', {
            filter: 'all',
          });
          navigation.closeDrawer();
        }}
        active={activeItemIndex === 2}
      >
        <NavigationButtonText active={activeItemIndex === 2}>
          Minhas corridas
        </NavigationButtonText>
        <Icon active={activeItemIndex === 2} name="racing-helmet" />
      </NavigationButton>

       <NavigationButton
        onPress={() => {
          navigation.navigate('Map');
          navigation.closeDrawer();
        }}
        active={activeItemIndex === 3}
      >
        <NavigationButtonText active={activeItemIndex === 3}>
          Meu perfil
        </NavigationButtonText>
        <Icon active={activeItemIndex === 3} name="account-badge" />
      </NavigationButton> */}

      <NavigationButton
        onPress={() => {
          BackgroundGeolocation.stop();
          BackgroundGeolocation.removeAllListeners();
          dispatch(signout());
          navigation.navigate("Map");
          navigation.closeDrawer();
        }}
      >
        <NavigationButtonText>Sair</NavigationButtonText>
        <Icon name="logout" />
      </NavigationButton>
    </Container>
  );
}
