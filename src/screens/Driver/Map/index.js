import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PermissionsAndroid, AppState } from "react-native";
import { PERMISSIONS, RESULTS, request, check } from "react-native-permissions";
import KeepAwake from "react-native-keep-awake";
import messaging from "@react-native-firebase/messaging";
import Geolocation from "react-native-geolocation-service";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import NetInfo from "@react-native-community/netinfo";

import { updateFirebaseTokenRequest } from "~/store/modules/auth/actions";
import { setLocation, racesRequest } from "~/store/modules/driver/actions";

import colors from "~/styles/colors";

import {
  Map,
  Header,
  Container,
  BottomButtons,
  Button,
  TargetButton,
  TargetButtonContainer,
  TargetIcon,
  MessageContainer,
  Message,
} from "./styles";
import MenuButton from "~/components/MenuButton";
import urls from "~/config/urls";
import { openModal } from "~/store/modules/modal/actions";
import shareLocation from "~/services/shareLocation";

export default function DriverNavigation({ navigation }) {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [isRequestPermissionVisible, setIsRequestPermissionVisible] = useState(
    false
  );
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const _id = useSelector((state) => state.auth._id);
  const profileStatus = useSelector((state) => state.auth.profileStatus);
  const token = useSelector((state) => state.auth.token);
  const firebaseNotificationToken = useSelector(
    (state) => state.auth.firebaseNotificationToken
  );
  const [mapRef, setMapRef] = useState(null);
  const [sharingLocation, setSharingLocation] = useState(false);
  const [connection, setConnection] = useState(false);
  const [gps, setGPS] = useState(false);

  const [message, setMessage] = useState(null);

  useEffect(() => {
    Geolocation.watchPosition(
      (info) => {
        setGPS(true);
      },
      (err) => {
        setGPS(false);
      }
    );

    const unsubNetInfo = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        setConnection(true);
      } else {
        setConnection(false);
      }
    });

    messaging()
      .getToken()
      .then((token) => {
        if (firebaseNotificationToken !== token)
          dispatch(updateFirebaseTokenRequest(token));
      });

    KeepAwake.activate(); // Keep screen active

    let races = null;

    if (profileStatus === "free" || profileStatus === "awaitingPayment")
      races = setInterval(() => {
        dispatch(racesRequest());
      }, 1500);

    return () => {
      if (races) clearInterval(races);
      unsubNetInfo();
      Geolocation.stopObserving();
    };
  }, [profileStatus]);

  useEffect(() => {
    if (mapRef) requestLocationPermission(true);
    //getCurrentLocation(animateCamera);
  }, [mapRef]);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (nextAppState === "active") setAppStateVisible(true);
    else setAppStateVisible(false);
  };

  useEffect(() => {
    // console.log(appStateVisible);
    if (appStateVisible && !isRequestPermissionVisible) {
      requestLocationPermission(true);
    }
  }, [appStateVisible]);

  const animateCamera = (latitude, longitude) => {
    mapRef.animateCamera(
      {
        center: {
          latitude: latitude,
          longitude: longitude,
        },
        pitch: 0,
        heading: 0,
        altitude: 500,
        zoom: 16,
      },
      { duration: 2500 }
    );
  };

  useEffect(() => {
    // console.log(connection, gps, sharingLocation);
    if (profileStatus === "free" || profileStatus === "awaitingPayment") {
      if (connection && gps && !sharingLocation) {
        BackgroundGeolocation.removeAllListeners();
        BackgroundGeolocation.stop();
        shareLocation("Você está online :)", token, _id);
        setSharingLocation(true);
      } else if (!connection) {
        BackgroundGeolocation.removeAllListeners();
        BackgroundGeolocation.stop();
        shareLocation("Offline: Verifique sua Internet", token, _id);
        setSharingLocation(false);
      } else if (!gps) {
        BackgroundGeolocation.removeAllListeners();
        BackgroundGeolocation.stop();
        shareLocation("Offline: Ative sua localização", token, _id);
        setSharingLocation(false);
      }
    }
  }, [connection, gps, sharingLocation, profileStatus]);

  const requestLocationAllTime = async (animated = false) => {
    await request(PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION)
      .then(async (result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            setMessage({
              message:
                "Clique aqui e permita que o UniCaronas acesse localização o tempo todo ou você ficará online apenas com o app aberto!",
              color: colors.warning,
              action: () => requestLocationPermission(true),
            });
            break;
          case RESULTS.GRANTED:
            if (animated) {
              getCurrentLocation(animateCamera);
            }

            setMessage(null);

            break;
          case RESULTS.BLOCKED:
            setMessage({
              message:
                "Acesse as configurações do dispositivo e permita que o UniCaronas acesse sua localização o tempo todo ou você ficará online apenas com o app aberto!",
              color: colors.warning,
            });
            break;
        }
      })
      .catch((error) => {});
  };

  const requestLocationPermission = async (animated = false) => {
    setIsRequestPermissionVisible(true);
    await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      .then(async (result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            break;
          case RESULTS.DENIED:
            setMessage({
              message:
                "Clique aqui e permita que o UniCaronas acesse sua localização!",
              color: colors.danger,
              action: () => requestLocationPermission(true),
            });
            break;
          case RESULTS.GRANTED:
            if (animated) {
              getCurrentLocation(animateCamera);
            }

            await requestLocationAllTime(true);

            break;
          case RESULTS.BLOCKED:
            setMessage({
              message:
                "Acesse as configurações do dispositivo e permita que o UniCaronas acesse sua localização!",
              color: colors.danger,
            });
            break;
        }
      })
      .catch((error) => {});
    setIsRequestPermissionVisible(false);
  };

  const getCurrentLocation = (action = null) => {
    Geolocation.getCurrentPosition(
      (info) => {
        dispatch(setLocation(info.coords.latitude, info.coords.longitude));
        if (action && mapRef !== null)
          action(info.coords.latitude, info.coords.longitude);

        setGPS(true);
      },
      (err) => {
        console.log(err);
        if (err.code === 1)
          dispatch(
            openModal(
              "Error",
              "Para continuar permita que o UniCaronas acesse sua localização.",
              "map-marker-off",
              "wobble",
              () => requestLocationPermission()
            )
          );
        else if (err.code === 2)
          dispatch(
            openModal(
              "Error",
              "Ative sua localização para continuar.",
              "map-marker-off",
              "wobble",
              null
            )
          );
        else if (err.code === 3)
          dispatch(
            openModal(
              "Error",
              "Verifique sua conexão com a internet e tente novamente.",
              "wifi-strength-off",
              "wobble",
              null
            )
          );
      }
    );
  };

  return (
    <Container>
      <Map
        ref={(ref) => setMapRef(ref)}
        style={{ flex: 1 }}
        showsMyLocationButton={false}
        showsUserLocation={true}
        pitchEnabled={false}
        userLocationUpdateInterval={3000}
        userLocationFastestInterval={3000}
        showsIndoors={true}
      ></Map>

      <BottomButtons>
        <TargetButtonContainer>
          <TargetButton onPress={() => getCurrentLocation(animateCamera)}>
            <TargetIcon />
          </TargetButton>
        </TargetButtonContainer>
      </BottomButtons>

      <Header>
        {message && (
          <MessageContainer
            onPress={message?.action}
            background={message.color}
          >
            <Message>{message.message}</Message>
          </MessageContainer>
        )}
        <MenuButton
          navigation={navigation}
          notify={profileStatus !== "free"}
          absolute={false}
        />
      </Header>
    </Container>
  );
}
