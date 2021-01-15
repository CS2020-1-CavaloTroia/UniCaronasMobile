import React, { useState, useEffect, useMemo } from "react";
import { PermissionsAndroid } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import messaging from "@react-native-firebase/messaging";
import { Formik } from "formik";
import * as Yup from "yup";
import KeepAwake from "react-native-keep-awake";
import MapView, { Marker, ProviderPropType } from "react-native-maps";
import Polyline from "@mapbox/polyline";
import Geolocation from "react-native-geolocation-service";

import { racesRequest } from "~/store/modules/passenger/actions";

import { GOOGLE_MAPS_APIKEY } from "~/config/maps";

import Modal from "react-native-modal";

import Input from "~/components/Input";

import darkMap from "~/config/darkmap";

import {
  Container,
  Map,
  BottomButtons,
  TargetButtonContainer,
  TargetButton,
  TargetIcon,
  Button,
  TextButton,
  Icon,
  TitlePlaceForm,
  ModalContainer,
} from "./styles";

import colors from "~/styles/colors";
import MenuButton from "~/components/MenuButton";
import ConnectedDrivers from "~/components/ConnectedDrivers";
import {
  setRace,
  clearRoute,
  createRaceRequest,
} from "~/store/modules/race/actions";
import { updateFirebaseTokenRequest } from "~/store/modules/auth/actions";
import { openModal } from "~/store/modules/modal/actions";

export default function ClientMap({ navigation }) {
  const dispatch = useDispatch();
  const address = useSelector((state) => state.race.address);
  const route = useSelector((state) => state.race.route);
  const [modalPlace, setModalPlace] = useState(false);
  const firebaseNotificationToken = useSelector(
    (state) => state.auth.firebaseNotificationToken
  );
  const [mapRef, setMapRef] = useState(null);

  const NewRaceFormSchema = Yup.object().shape({
    street: Yup.string().required("Informe um endereço válido."),
  });

  useEffect(() => {
    KeepAwake.activate(); // Keep screen active

    messaging()
      .getToken()
      .then((token) => {
        if (firebaseNotificationToken !== token)
          dispatch(updateFirebaseTokenRequest(token));
      });

    const races = setInterval(() => {
      dispatch(racesRequest());
    }, 1500);

    return () => {
      clearInterval(races);
    };
  }, []);

  useEffect(() => {
    if (mapRef) requestLocationPermission(true);
  }, [mapRef]);

  useEffect(() => {
    if (route && mapRef)
      mapRef.fitToCoordinates(route, {
        edgePadding: { top: 10, right: 75, bottom: 450, left: 120 },
        animated: true,
      });
  }, [route]);

  const requestLocationPermission = async (animated = false) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the locationnn");
        if (animated) {
          const coords = await getCurrentLocation();
          animateCamera(coords.coords.latitude, coords.coords.longitude);
        }
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {}
  };

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) =>
      Geolocation.getCurrentPosition(
        (info) => {
          resolve(info);
        },
        (err) => {
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
      )
    );
  };

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

  const getLocation = async (street, number) => {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${number}+${street}+Ji-Parana&key=${GOOGLE_MAPS_APIKEY}`
      );

      let respJson = await resp.json();

      const latitude = respJson.results[0].geometry.location.lat;
      const longitude = respJson.results[0].geometry.location.lng;

      const initialCoords = await getCurrentLocation();

      getDirections(
        initialCoords.coords.latitude,
        initialCoords.coords.longitude,
        { latitude, longitude },
        street,
        number
      );

      setModalPlace(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getDirections = async (
    latitude,
    longitude,
    destination,
    street,
    number
  ) => {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin="${latitude},${longitude}"&destination="${destination.latitude},${destination.longitude}"&key=${GOOGLE_MAPS_APIKEY}`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });

      dispatch(
        setRace(
          { latitude, longitude },
          {
            latitude: destination.latitude,
            longitude: destination.longitude,
          },
          { street, number },
          coords,
          respJson.routes[0].legs[0].distance.text,
          respJson.routes[0].legs[0].duration.text
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Map
        //customMapStyle={darkMap}
        ref={(ref) => setMapRef(ref)}
        style={{ flex: 1 }}
        showsMyLocationButton={false}
        showsUserLocation={true}
        pitchEnabled={false}
        userLocationUpdateInterval={1000}
        userLocationFastestInterval={1000}
        showsIndoors={true}
        showsCompass={false}
      >
        <ConnectedDrivers />

        {route && (
          <MapView.Polyline
            coordinates={route}
            strokeWidth={3}
            strokeColor={colors.secondaryColor}
          />
        )}
      </Map>

      <BottomButtons>
        <TargetButtonContainer>
          <TargetButton
            onPress={async () => {
              const coords = await getCurrentLocation();
              animateCamera(coords.coords.latitude, coords.coords.longitude);
            }}
          >
            <TargetIcon />
          </TargetButton>
        </TargetButtonContainer>

        {!route && (
          <Button onPress={() => setModalPlace(true)}>
            <TextButton>Para onde vamos?</TextButton>
            <Icon name="arrow-right" />
          </Button>
        )}

        {route && (
          <>
            <Button onPress={() => dispatch(createRaceRequest())}>
              <TextButton>Tudo certo, pode chamar</TextButton>
              <Icon name="map-marker-radius" />
            </Button>

            <Button
              background={colors.primaryColor}
              onPress={() => setModalPlace(true)}
            >
              <TextButton color={colors.secondaryColor}>
                Alterar endereço
              </TextButton>
            </Button>

            <Button
              background={colors.primaryColor}
              onPress={() => {
                dispatch(clearRoute());
              }}
            >
              <TextButton color={colors.secondaryColor}>Cancelar</TextButton>
            </Button>
          </>
        )}
      </BottomButtons>

      <MenuButton navigation={navigation} />

      <Modal
        isVisible={modalPlace}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onRequestClose={() => setModalPlace(false)}
        animationInTiming={300}
        onBackdropPress={() => setModalPlace(false)}
        supportedOrientations={["portrait"]}
        style={{ margin: 0, padding: 0 }}
      >
        <ModalContainer>
          <TitlePlaceForm>Endereço da corrida</TitlePlaceForm>
          <Formik
            initialValues={{
              street: address.street,
              number: address.number,
            }}
            onSubmit={(values) => getLocation(values.street, values.number)}
            validationSchema={() => NewRaceFormSchema}
          >
            {({ values, handleChange, handleSubmit, errors, touched }) => (
              <>
                <Input
                  placeholder="ex. IG Shopping"
                  placeholderTextColor={colors.inactiveBlack}
                  color={colors.secondaryColor}
                  value={values.street}
                  onChangeText={handleChange("street")}
                  title="Rua/Avenida ou lugar"
                  errorText={
                    errors.street && touched.street ? errors.street : null
                  }
                />

                <Input
                  placeholder="ex. 548"
                  placeholderTextColor={colors.inactiveBlack}
                  color={colors.secondaryColor}
                  value={values.number}
                  onChangeText={handleChange("number")}
                  title="Número"
                />

                <Button style={{ marginTop: 30 }} onPress={handleSubmit}>
                  <TextButton>Buscar</TextButton>
                </Button>
              </>
            )}
          </Formik>
        </ModalContainer>
      </Modal>
    </Container>
  );
}
