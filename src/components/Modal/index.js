import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "~/store/modules/modal/actions";

import {
  ModalContainer,
  Container,
  Icon,
  Title,
  Message,
  IconContainer,
  Button,
  TextButton,
} from "./styles";

export default function ModalComponent() {
  const dispatch = useDispatch();
  const title = useSelector((state) => state.modal.title);
  const message = useSelector((state) => state.modal.message);
  const icon = useSelector((state) => state.modal.icon);
  const open = useSelector((state) => state.modal.open);
  const animation = useSelector((state) => state.modal.animation);
  const leftAction = useSelector((state) => state.modal.leftAction);

  return (
    <ModalContainer
      isVisible={open}
      animationIn={animation}
      animationOut="slideOutRight"
      onRequestClose={() => {
        dispatch(closeModal());
        if (leftAction) {
          leftAction();
        }
      }}
      animationInTiming={300}
      onBackdropPress={() => {
        dispatch(closeModal());
        if (leftAction) {
          leftAction();
        }
      }}
      supportedOrientations={["portrait"]}
    >
      <Container>
        <IconContainer>
          <Icon name={icon} />
        </IconContainer>

        <Title>{title}</Title>
        <Message>{message}</Message>
        <Button
          onPress={() => {
            dispatch(closeModal());
            if (leftAction) {
              leftAction();
            }
          }}
        >
          <TextButton>OK</TextButton>
        </Button>
      </Container>
    </ModalContainer>
  );
}
