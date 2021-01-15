import React, {
  useState,
  useEffect,
  useCallback,
  useLayoutEffect,
} from "react";
import auth from "@react-native-firebase/auth";
import Modal from "react-native-modal";
import ImagePicker from "react-native-image-crop-picker";
import DocumentPicker from "react-native-document-picker";
import { useDispatch, useSelector } from "react-redux";
import Input from "~/components/Input";
import {
  HeaderContainer,
  ButtonHeaderIcon,
  HeaderIcon,
  Background,
  Container,
  Form,
  PhoneNumber,
  TypeButton,
  TypeButtonContainer,
  TypeButtonImage,
  TypeButtonText,
  LoadingContainer,
  UploadButtonContainer,
  UploadButtonContainerIcon,
  UploadButtonIcon,
  UploadButtonIcon2,
  UploadButtonText,
  UploadButtons,
  CheckUploadContainer,
  CheckIcon,
  ChangeImageModalContainer,
  ChangeImageModalTitle,
  ChangeImageModalButtons,
  ChangeImageModalButtonContainer,
  ChangeImageModalButtonIcon,
  ChangeImageModalButtonIconContainer,
  ChangeImageModalButtonText,
} from "./styles";
import Button from "~/components/Button";
import colors from "~/styles/colors";
import { Alert, BackHandler } from "react-native";
import {
  setUser,
  setUserType,
  signinRequest,
  userRequest,
  signout,
} from "~/store/modules/auth/actions";
import Loading from "~/components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";

import schoolbag from "~/assets/schoolbag.png";
import driver from "~/assets/driver.png";
import KeyboardScrollView from "~/components/KeyboardScrollView";

export default function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [uploadType, setUploadType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [response, setResponse] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [loadingSMS, setLoadingSMS] = useState(false);
  const [_cpf, _setCPF] = useState("");

  const getUser = useSelector((state) => state.auth.getUser);
  const name = useSelector((state) => state.auth.name);
  const loading = useSelector((state) => state.auth.loading);
  const CNHDocument = useSelector((state) => state.auth.CNHDocument);
  const thumbnail = useSelector((state) => state.auth.thumbnail);
  const cpf = useSelector((state) => state.auth.cpf);
  const [type, setType] = useState("");

  const [_name, _setName] = useState("");

  //IMAGES/DOCUMENTS
  const [_CNHDocument, _setCNHDocument] = useState(null);
  const [_profileImage, _setProfileImage] = useState(null);

  function onAuthStateChanged(user) {
    setResponse(user);
  }

  useEffect(() => {
    clear();
    dispatch(signout());
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onBackPress = () => {
    if (getUser) {
      dispatch(setUser(null));
      return true;
    } else if (!getUser && response) {
      setResponse(false);
      setConfirm(null); // FUTURE MODIFICATION onAuthStateChanged
      return true;
    } else if (confirm && !response) {
      setConfirm(null);
      return true;
    } else {
      return false;
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: "Login",
      headerTintColor: colors.white,
      headerStyle: {
        backgroundColor: colors.secondaryColor,
      },

      headerLeft: () => {
        if (confirm)
          return (
            <HeaderContainer
              style={{
                marginLeft: 20,
              }}
            >
              <ButtonHeaderIcon onPress={onBackPress}>
                <HeaderIcon name="arrow-left" />
              </ButtonHeaderIcon>
            </HeaderContainer>
          );
      },
    });
  }, [navigation, getUser, response, confirm]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [getUser, response, confirm])
  );

  useEffect(() => {
    if (getUser) {
      _setName(name);
      _setCPF(cpf);
    }
  }, [getUser]);

  useEffect(() => {
    if (uploadType !== null) {
      setModalVisible(true);
    }
  }, [uploadType]);

  useEffect(() => {
    if (!modalVisible) {
      setUploadType(null);
    }
  }, [modalVisible]);

  const clear = () => {
    if (auth().currentUser) auth().signOut();
    setResponse(null);
    setConfirm(null);
    setPhoneNumber("");
    setCode("");
    setType("");
  };

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        `+55 ${phoneNumber}`
      );
      setConfirm(confirmation);
    } catch (error) {
      console.log(error);
      Alert.alert(
        null,
        "Verifique seu número e/ou conexão com a Internet e tente novamente."
      );
    }

    setLoadingSMS(false);
  };

  const confirmCode = async () => {
    try {
      const resp = await confirm.confirm(code);
      setResponse(resp.user);
      setCode("");
    } catch (error) {
      console.log(error);
      Alert.alert(null, "Código inválido.");
    }

    setLoadingSMS(false);
  };

  const numberOnly = (text) => {
    try {
      const numberPattern = /\d+/g;
      return text.match(numberPattern).join("");
    } catch (e) {
      return "";
    }
  };

  const selectImageFromGallery = async () => {
    if (uploadType === 1) {
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        freeStyleCropEnabled: true,
        enableRotationGesture: true,
      });
      _setProfileImage({
        mime: image.mime,
        name: image.path.replace(/^.*[\\\/]/, ""),
        image: image.path,
      });
      setModalVisible(false);
    }

    if (uploadType === 0) {
      const image = await ImagePicker.openPicker({
        cropping: true,
        freeStyleCropEnabled: true,
        enableRotationGesture: true,
      });

      _setCNHDocument({
        mime: image.mime,
        name: image.path.replace(/^.*[\\\/]/, ""),
        image: image.path,
      });
      setModalVisible(false);
    }
  };

  const selectImageFromCamera = async () => {
    if (uploadType === 1) {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
        freeStyleCropEnabled: true,
        enableRotationGesture: true,
      });
      _setProfileImage({
        mime: image.mime,
        name: image.path.replace(/^.*[\\\/]/, ""),
        image: image.path,
      });
      setModalVisible(false);
    }

    if (uploadType === 0) {
      const image = await ImagePicker.openCamera({
        cropping: true,
        freeStyleCropEnabled: true,
        enableRotationGesture: true,
      });

      _setCNHDocument({
        mime: image.mime,
        name: image.path.replace(/^.*[\\\/]/, ""),
        image: image.path,
      });
      setModalVisible(false);
    }
  };

  const finish = () => {
    return (
      _name !== "" &&
      (type === "passenger" ||
        (type === "driver" &&
          _cpf.length === 14 &&
          (_CNHDocument || CNHDocument) &&
          (_profileImage || thumbnail)))
    );
  };

  const renderForm = () => {
    if (!confirm)
      return (
        <>
          <Form>
            <Input
              ref={(input) => (phoneNumberInput = input)}
              placeholder="(69) 00000-0000"
              placeholderTextColor={colors.inactiveWhite}
              color={colors.white}
              mask="([00]) [00000]-[0000]"
              value={phoneNumber}
              onChangeText={(text) => {
                setPhoneNumber(text);
              }}
              title="Número do telefone"
              keyboardType="numeric"
              onSubmitEditing={
                phoneNumber.length === 15 && !loadingSMS
                  ? () => {
                      setLoadingSMS(true);
                      signInWithPhoneNumber();
                    }
                  : null
              }
            />
          </Form>

          <Button
            style={{ width: 220 }}
            text="Enviar Código"
            background={
              phoneNumber.length === 15
                ? colors.primaryColor
                : colors.inactiveWhite
            }
            loading={loadingSMS}
            color={
              phoneNumber.length === 15
                ? colors.secondaryColor
                : colors.inactiveWhite
            }
            onPress={
              phoneNumber.length === 15 && !loadingSMS
                ? () => {
                    setLoadingSMS(true);
                    signInWithPhoneNumber();
                  }
                : null
            }
          />
        </>
      );

    if (confirm && !response)
      return (
        <>
          <Form>
            <PhoneNumber>{`Código enviado para: ${phoneNumber}`}</PhoneNumber>
            <Input
              ref={(input) => (codeInput = input)}
              placeholder="000000"
              placeholderTextColor={colors.inactiveWhite}
              color={colors.white}
              value={code}
              onChangeText={(text) => setCode(numberOnly(text))}
              title="Código"
              keyboardType="numeric"
              onSubmitEditing={
                code !== "" && !loadingSMS
                  ? () => {
                      setLoadingSMS(true);
                      confirmCode();
                    }
                  : null
              }
            />
          </Form>
          <Button
            text="Validar"
            style={{ width: 220 }}
            loading={loadingSMS}
            color={code !== "" ? colors.white : colors.inactiveWhite}
            background={
              code !== "" ? colors.primaryColor : colors.inactiveWhite
            }
            onPress={
              code !== "" && !loadingSMS
                ? () => {
                    setLoadingSMS(true);
                    confirmCode();
                  }
                : null
            }
          />

          <Button
            text="Reinserir número do telefone"
            background={colors.transparent}
            onPress={() => setConfirm(null)}
          />
        </>
      );
    else if (response && !getUser) {
      return (
        <Form>
          <TypeButtonContainer>
            <TypeButton
              onPress={
                !loading
                  ? () => {
                      setType("passenger");
                      dispatch(
                        userRequest(
                          "passenger",
                          `+55${phoneNumber
                            .split("(")
                            .join("")
                            .split(")")
                            .join("")
                            .split(" ")
                            .join("")
                            .split("-")
                            .join("")}`,
                          response.uid
                        )
                      );
                    }
                  : () => {
                      console.log("BBBB");
                    }
              }
            >
              <TypeButtonImage style={{ width: 45 }} source={schoolbag} />
              <TypeButtonText>Passageiro</TypeButtonText>
              {loading && type === "passenger" && (
                <LoadingContainer>
                  <Loading />
                </LoadingContainer>
              )}
            </TypeButton>

            <TypeButton
              onPress={
                !loading
                  ? () => {
                      setType("driver");
                      dispatch(
                        userRequest(
                          "driver",
                          `+55${phoneNumber
                            .split("(")
                            .join("")
                            .split(")")
                            .join("")
                            .split(" ")
                            .join("")
                            .split("-")
                            .join("")}`,
                          response.uid
                        )
                      );
                    }
                  : null
              }
            >
              <TypeButtonImage source={driver} />
              <TypeButtonText>Motorista</TypeButtonText>
              {loading && type === "driver" && (
                <LoadingContainer>
                  <Loading />
                </LoadingContainer>
              )}
            </TypeButton>
          </TypeButtonContainer>
        </Form>
      );
    } else if (getUser) {
      return (
        <>
          <Form>
            <Input
              ref={(input) => (nameInput = input)}
              placeholder="ex. João da Silva"
              placeholderTextColor={colors.inactiveWhite}
              color={colors.white}
              value={_name}
              onChangeText={(text) => _setName(text)}
              title="Seu nome"
              //onSubmitEditing={() => cpfInput.focus()}
            />

            {type === "driver" && (
              <Input
                mask="[000].[000].[000]-[00]"
                ref={(input) => (cpfInput = input)}
                placeholder="ex. 000.000.000-00"
                placeholderTextColor={colors.inactiveWhite}
                color={colors.white}
                value={_cpf}
                keyboardType="numeric"
                onChangeText={(text) => _setCPF(text)}
                title="Seu CPF"
              />
            )}

            <UploadButtons>
              {type === "driver" && (
                <>
                  <UploadButtonContainer onPress={() => setUploadType(0)}>
                    <UploadButtonContainerIcon>
                      <UploadButtonIcon name="idcard" />

                      {(_CNHDocument || CNHDocument) && (
                        <CheckUploadContainer>
                          <CheckIcon />
                        </CheckUploadContainer>
                      )}
                    </UploadButtonContainerIcon>

                    <UploadButtonText>Imagem da CNH</UploadButtonText>
                  </UploadButtonContainer>
                </>
              )}

              <UploadButtonContainer onPress={() => setUploadType(1)}>
                <UploadButtonContainerIcon>
                  <UploadButtonIcon name="camerao" />

                  {(_profileImage || thumbnail) && (
                    <CheckUploadContainer>
                      <CheckIcon />
                    </CheckUploadContainer>
                  )}
                </UploadButtonContainerIcon>

                <UploadButtonText>Imagem do perfil</UploadButtonText>
              </UploadButtonContainer>
            </UploadButtons>
          </Form>
          <Button
            text="Finalizar"
            loading={loading}
            style={{ width: 180 }}
            background={finish() ? colors.primaryColor : colors.inactiveWhite}
            color={finish() ? colors.secondaryColor : colors.inactiveWhite}
            onPress={
              !loading
                ? () =>
                    finish()
                      ? dispatch(
                          signinRequest(
                            _name,
                            response.phoneNumber,
                            response.uid,
                            type,
                            _cpf,
                            _CNHDocument,
                            _profileImage
                          )
                        )
                      : {}
                : null
            }
          />
        </>
      );
    }
  };

  const renderModalTitle = () => {
    if (uploadType === 1) return "Imagem do Perfil";
    if (uploadType === 0) return "Imagem da CNH";
  };

  return (
    <Background>
      <Container>
        <KeyboardScrollView>{renderForm()}</KeyboardScrollView>

        <Modal
          isVisible={modalVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          onRequestClose={() => setModalVisible(false)}
          animationInTiming={300}
          onBackdropPress={() => setModalVisible(false)}
          supportedOrientations={["portrait"]}
          style={{ margin: 0, padding: 0 }}
        >
          <ChangeImageModalContainer>
            <ChangeImageModalTitle>{renderModalTitle()}</ChangeImageModalTitle>
            <ChangeImageModalButtons>
              <ChangeImageModalButtonContainer
                onPress={() => selectImageFromGallery()}
              >
                <ChangeImageModalButtonIconContainer>
                  <ChangeImageModalButtonIcon name="image" />
                </ChangeImageModalButtonIconContainer>
                <ChangeImageModalButtonText>Galeria</ChangeImageModalButtonText>
              </ChangeImageModalButtonContainer>

              <ChangeImageModalButtonContainer
                onPress={() => selectImageFromCamera()}
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
    </Background>
  );
}
