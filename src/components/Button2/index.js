import React from "react";

import { Container, TextButton, Icon } from "./styles";
import Loading from "../Loading";

export default function Button2({
  text = "",
  icon = null,
  action = null,
  color = "white",
  background = "black",
  loading = false,
}) {
  return (
    <Container onPress={!loading ? action : null} background={background}>
      <TextButton color={color}>{text}</TextButton>
      {loading && <Loading />}
      {!loading && <Icon name={icon} />}
    </Container>
  );
}
