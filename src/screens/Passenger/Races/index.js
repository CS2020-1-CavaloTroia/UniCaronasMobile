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
import RacePassengerRow from "~/components/Passenger/RacePassengerRow";
import MenuButton from "~/components/MenuButton";
import { removeRaceRequest } from "~/store/modules/race/actions";
import Loading from "~/components/Loading";

export default function Races({ route, navigation }) {
  const dispatch = useDispatch();
  const { filter } = route.params;
  const type = useSelector((state) => state.auth.type);
  const inProgressRaces = useSelector((state) => state[type].inProgressRaces);
  const awaitingRaces = useSelector((state) => state[type].awaitingRaces);

  const renderList = () => {
    if (filter === "inProgress") {
      if (!inProgressRaces)
        return (
          <LoadingContainter>
            <Message style={{ marginRight: 10 }}>Carregando</Message>
            <Loading size={30} />
          </LoadingContainter>
        );

      if (inProgressRaces.length === 0)
        return (
          <LoadingContainter>
            <Message style={{ marginRight: 10 }}>
              Não há entregas em andamento
            </Message>
          </LoadingContainter>
        );

      return inProgressRaces.map((value, index) => {
        return (
          <RacePassengerRow
            item={value}
            key={index}
            leftButtonAction={() => console.log("bb")}
          />
        );
      });
    } else if (filter === "awaiting") {
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
              Não há entregas cadastradas
            </Message>
          </LoadingContainter>
        );

      return awaitingRaces.map((value, index) => {
        return (
          <RacePassengerRow
            item={value}
            key={index}
            leftButtonAction={() => console.log("bb")}
            rightButtonAction={() => dispatch(removeRaceRequest(value._id))}
          />
        );
      });
    }
  };

  return (
    <Container>
      {filter === "awaiting" && <Title>Aguardando motorista</Title>}
      {filter === "inProgress" && <Title>Entregas em progresso</Title>}

      <ScrollContainer>
        <RaceList>{renderList()}</RaceList>
      </ScrollContainer>

      <MenuButton navigation={navigation} />
    </Container>
  );
}
