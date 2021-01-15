import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Container,
  Title,
  ScrollContainer,
  RaceList,
  LoadingContainter,
  Message,
} from "./styles";
import RaceDriverRow from "~/components/Driver/RaceDriverRow";
import MenuButton from "~/components/MenuButton";
import { goToPassengerRaceRequest } from "~/store/modules/race/actions";
import { Alert } from "react-native";
import Loading from "~/components/Loading";

export default function Races({ route, navigation }) {
  const dispatch = useDispatch();
  const { filter } = route.params;
  const inProgressRace = useSelector((state) => state.driver.inProgressRace);
  const awaitingRaces = useSelector((state) => state.driver.awaitingRaces);

  const renderList = () => {
    if (!awaitingRaces)
      return (
        <LoadingContainter>
          <Message style={{ marginRight: 10 }}>Carregando</Message>
          <Loading size={30} />
        </LoadingContainter>
      );

    if (awaitingRaces.length === 0)
      return (
        <LoadingContainter>
          <Message style={{ marginRight: 10 }}>
            Não há entregas no momento
          </Message>
        </LoadingContainter>
      );

    if (filter === "awaiting") {
      return awaitingRaces.map((value, index) => {
        return (
          <RaceDriverRow
            item={value}
            key={index}
            leftButtonAction={() => console.log("aa")}
            rightButtonAction={() => {
              if (inProgressRace && inProgressRace.length > 0)
                Alert.alert(
                  null,
                  "Você não pode iniciar uma corrida com outra em andamento!"
                );
              else
                dispatch(
                  goToPassengerRaceRequest(value._id, value, navigation)
                );
            }}
          />
        );
      });
    }
  };

  return (
    <Container>
      {filter === "awaiting" && <Title>Corridas disponíveis</Title>}
      {filter === "inProgress" && <Title>Entrega em progresso</Title>}

      <ScrollContainer>
        <RaceList>{renderList()}</RaceList>
      </ScrollContainer>

      <MenuButton navigation={navigation} />
    </Container>
  );
}
