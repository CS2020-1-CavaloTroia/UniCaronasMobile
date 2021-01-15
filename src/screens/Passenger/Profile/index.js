import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import Modal from "react-native-modal";

import {
  Container,
  PhotoContainer,
  ChangeImageContainer,
  ChangeImageIcon,
  UserPhoto,
  UserName,
  NoProfileImageIcon,
  NoProfileImageContainer,
  ChangeImageModalContainer,
  ChangeImageModalTitle,
  ChangeImageModalButtons,
  ChangeImageModalButtonContainer,
  ChangeImageModalButtonIcon,
  ChangeImageModalButtonIconContainer,
  ChangeImageModalButtonText,
} from "./styles";
import { changeProfileImageRequest } from "~/store/modules/auth/actions";

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.name);
  const thumbnail = useSelector((state) => state.auth.thumbnail);
  const [changeImageModal, setChangeImageModal] = useState(false);

  const renderProfileImage = () => {
    if (thumbnail)
      return (
        <UserPhoto source={{ uri: thumbnail }}>
          <ChangeImageContainer
            onPress={() => {
              setChangeImageModal(true);
            }}
          >
            <ChangeImageIcon />
          </ChangeImageContainer>
        </UserPhoto>
      );

    return (
      <NoProfileImageContainer>
        <NoProfileImageIcon />
        <ChangeImageContainer
          onPress={() => {
            setChangeImageModal(true);
          }}
        >
          <ChangeImageIcon />
        </ChangeImageContainer>
      </NoProfileImageContainer>
    );
  };

  return (
    <Container>
      <PhotoContainer>
        {renderProfileImage()}

        <UserName>{userName}</UserName>
      </PhotoContainer>

      <Modal
        isVisible={changeImageModal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onRequestClose={() => setChangeImageModal(false)}
        animationInTiming={300}
        onBackdropPress={() => setChangeImageModal(false)}
        supportedOrientations={["portrait"]}
        style={{ margin: 0, padding: 0 }}
      >
        <ChangeImageModalContainer>
          <ChangeImageModalTitle>Foto do perfil</ChangeImageModalTitle>
          <ChangeImageModalButtons>
            <ChangeImageModalButtonContainer
              onPress={async () => {
                setChangeImageModal(false);
                const file = await ImagePicker.openPicker({
                  width: 300,
                  height: 300,
                  cropping: true,
                  cropperCircleOverlay: true,
                });

                dispatch(
                  changeProfileImageRequest({
                    mime: file.mime,
                    name: file.path.replace(/^.*[\\\/]/, ""),
                    path: file.path,
                  })
                );
              }}
            >
              <ChangeImageModalButtonIconContainer>
                <ChangeImageModalButtonIcon name="image" />
              </ChangeImageModalButtonIconContainer>
              <ChangeImageModalButtonText>Galeria</ChangeImageModalButtonText>
            </ChangeImageModalButtonContainer>

            <ChangeImageModalButtonContainer
              onPress={async () => {
                setChangeImageModal(false);
                const file = await ImagePicker.openCamera({
                  width: 300,
                  height: 300,
                  cropping: true,
                  cropperCircleOverlay: true,
                });

                dispatch(
                  changeProfileImageRequest({
                    mime: file.mime,
                    name: file.path.replace(/^.*[\\\/]/, ""),
                    path: file.path,
                  })
                );
              }}
            >
              <ChangeImageModalButtonIconContainer>
                <ChangeImageModalButtonIcon name="camera" />
              </ChangeImageModalButtonIconContainer>
              <ChangeImageModalButtonText>Camera</ChangeImageModalButtonText>
            </ChangeImageModalButtonContainer>
          </ChangeImageModalButtons>
        </ChangeImageModalContainer>
      </Modal>
    </Container>
  );
}
