import React from "react";
import {
  Container,
  LeftButton,
  RightButton,
  Title,
  Subtitle,
  CancelText,
  CancelIcon,
  IconText,
} from "./styles";
import moment from "moment";

export default function RacePassengerRow({
  item,
  leftButtonAction,
  rightButtonAction = null,
}) {
  const dateString = moment(item.initiated_at).locale("pt-br").calendar();

  return (
    <Container>
      <LeftButton onPress={leftButtonAction}>
        <Title numberOfLines={1}>
          <IconText name="map-marker-outline" />{" "}
          {`${item.address.street}${
            item.address.number ? `, ${item.address.number}` : ``
          } `}
        </Title>
        <Subtitle>{dateString}</Subtitle>
        <Subtitle>
          {item.distance} | {item.duration}
        </Subtitle>
      </LeftButton>
      {rightButtonAction && (
        <RightButton onPress={rightButtonAction}>
          <CancelIcon />
          <CancelText>Cancelar</CancelText>
        </RightButton>
      )}
    </Container>
  );
}
