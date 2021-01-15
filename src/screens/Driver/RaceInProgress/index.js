import React, { useEffect } from "react";
import { Linking, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import MapView from "react-native-maps";

import {
  startRaceRequest,
  finishRaceRequest,
  cancelRaceRequest,
} from "~/store/modules/race/actions";

import {
  Container,
  Map,
  InformationsContainer,
  InformationsScroll,
  Title,
  Text,
  Icon,
  Button,
  ButtonText,
  MotoIcon,
  CancelIcon,
  FinishIcon,
} from "./styles";
import colors from "~/styles/colors";
import MenuButton from "~/components/MenuButton";

export default function RaceInProgress({ navigation }) {
  const dispatch = useDispatch();
  const inProgressRace = useSelector((state) =>
    state.driver.inProgressRace !== [] ? state.driver.inProgressRace[0] : null
  );
  let mapRef;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     console.log("Focused");

  //     return () => {
  //       // console.log("Unfocused");
  //     };
  //   }, [])
  // );

  useEffect(() => {
    if (!inProgressRace) {
      navigation.navigate("AwaitingRaces", {
        filter: "awaiting",
      });
    }
  }, [inProgressRace]);

  const fitToCoordinates = () => {
    mapRef.fitToCoordinates(inProgressRace?.route, {
      edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
      animated: false,
    });
  };

  const renderInformations = () => {
    if (inProgressRace?.status === "goToPassenger")
      return (
        <>
          <Button
            onPress={() =>
              dispatch(startRaceRequest(inProgressRace._id, inProgressRace))
            }
            color={colors.primaryColor}
            style={{ marginTop: 40 }}
          >
            <ButtonText>Iniciar corrida</ButtonText>
            <MotoIcon />
          </Button>

          <Button
            onPress={() => {
              navigation.navigate("AwaitingRaces", {
                filter: "awaiting",
              });
              dispatch(cancelRaceRequest(inProgressRace._id));
            }}
          >
            <ButtonText>Cancelar corrida</ButtonText>
            <CancelIcon />
          </Button>
        </>
      );

    if (inProgressRace?.status === "inProgress")
      return (
        <Button
          onPress={() => {
            dispatch(finishRaceRequest(inProgressRace._id, inProgressRace));
            navigation.navigate("Map");
          }}
          color={colors.primaryColor}
          style={{ marginTop: 40 }}
        >
          <ButtonText>Finalizar corrida</ButtonText>
          <FinishIcon />
        </Button>
      );
  };

  return (
    <Container>
      <Map
        ref={(ref) => (mapRef = ref)}
        onLayout={(event) => {
          fitToCoordinates();
        }}
        showsMyLocationButton={false}
        showsUserLocation={true}
        pitchEnabled={false}
        showsIndoors={true}
        zoomControlEnabled={false}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
      >
        {inProgressRace && (
          <MapView.Polyline
            coordinates={inProgressRace?.route}
            strokeWidth={2}
            strokeColor={colors.primaryColor}
          />
        )}
      </Map>
      <InformationsContainer>
        <InformationsScroll>
          <Title>Dados da corrida</Title>
          <Text>De: {inProgressRace?.passenger.name}</Text>

          <TouchableOpacity
            onPress={() =>
              Linking.openURL(`tel:${inProgressRace?.passenger.phoneNumber}`)
            }
          >
            <Text>
              {inProgressRace?.passenger.phoneNumber
                .slice(3, 14)
                .replace(/(\d{2})(\d{5})(\d{4})/, function (
                  regex,
                  arg0,
                  arg1,
                  arg2
                ) {
                  return `(${arg0}) ${arg1}-${arg2}`;
                })}{" "}
              <Icon name="phone" />
            </Text>
          </TouchableOpacity>

          <Text style={{ marginTop: 30 }}>
            Para: {inProgressRace?.address.street}
          </Text>

          {renderInformations()}
        </InformationsScroll>
      </InformationsContainer>

      <MenuButton navigation={navigation} />
    </Container>
  );
}
