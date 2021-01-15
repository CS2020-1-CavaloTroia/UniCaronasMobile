import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import ImagePicker from "react-native-image-crop-picker";
import Swiper from "react-native-swiper";
import LottieView from "lottie-react-native";
import Modal from "react-native-modal";
import emoji from "node-emoji";

// Screens
import BasicInformations from "./Screens/BasicInformations";
import Deliveries from "./Screens/Deliveries";
import Payments from "./Screens/Payments";
import Settings from "./Screens/Settings";

import {
  Container,
  Content,
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
  UserRating,
  StarsContainer,
  StarContainer,
  StarAbsoluteContainer,
  ProfileStatusMessage,
  HorizontalScroll,
  ScreenButton,
  ScreenText,
  PhoneNumberText,
} from "./styles";
import { changeProfileImageRequest } from "~/store/modules/auth/actions";

import startAnimation from "~/assets/star.json";
import { View } from "react-native";
import Star from "~/components/Star";
import Line from "~/components/Line";
import colors from "~/styles/colors";

const screenNames = [
  "Informações básicas",
  // "Entregas",
  // "Pagamentos",
  // "Configurações",
];

const scrollTo = [0, 0, 280, 400];

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const _swiper = useRef(null);
  const _horizontalScroll = useRef(null);
  const userName = useSelector((state) => state.auth.name);
  const phoneNumber = useSelector((state) => state.auth.phoneNumber);
  const thumbnail = useSelector((state) => state.auth.thumbnail);
  const profileStatus = useSelector((state) => state.auth.profileStatus);
  const [changeImageModal, setChangeImageModal] = useState(false);
  const [animationStarRef1, setAnimationStarRef1] = useState(null);
  const [animationStarRef2, setAnimationStarRef2] = useState(null);
  const [animationStarRef3, setAnimationStarRef3] = useState(null);
  const [animationStarRef4, setAnimationStarRef4] = useState(null);
  const [animationStarRef5, setAnimationStarRef5] = useState(null);
  const [activeScreen, setActiveScreen] = useState(0);
  const ratingOfDriver = 5;

  useEffect(() => {
    if (animationStarRef1) animationStarRef1.play();
  }, [animationStarRef1]);

  useEffect(() => {
    if (animationStarRef2) animationStarRef2.play();
  }, [animationStarRef2]);

  useEffect(() => {
    if (animationStarRef3) animationStarRef3.play();
  }, [animationStarRef3]);

  useEffect(() => {
    if (animationStarRef4) animationStarRef4.play();
  }, [animationStarRef4]);

  useEffect(() => {
    if (animationStarRef5) animationStarRef5.play();
  }, [animationStarRef5]);

  const renderStars = () => {
    let stars = [];

    if (typeof ratingOfDriver === "number") {
      let rating = ratingOfDriver;
      for (i = 0; i < 5; i++) {
        if (rating >= 1) stars.push(100);
        else if (rating <= 0) stars.push(0);
        else stars.push(rating * 100);

        rating -= 1;
      }
    } else {
      stars = [0, 0, 0, 0, 0];
    }

    return stars.map((value, index) => {
      return (
        <StarContainer>
          {value === 100 && (
            <LottieView
              style={{
                flex: 1,
              }}
              resizeMode="contain"
              autoSize
              ref={(ref) => {
                if (index === 0) setAnimationStarRef1(ref);
                if (index === 1) setAnimationStarRef2(ref);
                if (index === 2) setAnimationStarRef3(ref);
                if (index === 3) setAnimationStarRef4(ref);
                if (index === 4) setAnimationStarRef5(ref);
              }}
              source={startAnimation}
              autoPlay
              loop={false}
            />
          )}
          <StarAbsoluteContainer>
            <Star size={"65%"} percent={value} />
          </StarAbsoluteContainer>
        </StarContainer>
      );
    });
  };

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

  const renderProfileMessage = () => {
    if (profileStatus === "analysing")
      return (
        <ProfileStatusMessage>
          {emoji.emojify(
            `Seu cadastro encontrase em análise, aguarde mais um pouco. :motor_scooter: :heart_eyes: :heart:`
          )}
        </ProfileStatusMessage>
      );

    if (profileStatus === "awaitingPayment")
      return (
        <ProfileStatusMessage>
          {emoji.emojify(
            `Estamos aguardando seu pagamento. Se você já realizou seu pagamento não se preocupe ele será processado em até 48 horas. :motor_scooter: :money_mouth_face:`
          )}
        </ProfileStatusMessage>
      );
    if (profileStatus === "block")
      return (
        <ProfileStatusMessage>
          {emoji.emojify(
            `Seu cadastro foi bloqueado por falta de pagamento. Realize o pagamento e desbloqueie seu cadastro. :grin: :motor_scooter: :moneybag: `
          )}
        </ProfileStatusMessage>
      );
  };

  return (
    <Container>
      <Content>
        <PhotoContainer>
          {renderProfileImage()}

          <UserName>{userName}</UserName>
          <PhoneNumberText>
            {phoneNumber.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, function (
              regex,
              arg0,
              arg1,
              arg2,
              arg3
            ) {
              return `${arg0} (${arg1}) ${arg2}-${arg3}`;
            })}
          </PhoneNumberText>
        </PhotoContainer>

        {profileStatus !== "analysing" && (
          <UserRating>
            <StarsContainer>{renderStars()}</StarsContainer>
          </UserRating>
        )}

        {renderProfileMessage()}
      </Content>

      <HorizontalScroll ref={_horizontalScroll}>
        {screenNames.map((value, index) => {
          return (
            <ScreenButton
              onPress={() => {
                _swiper.current.scrollTo(index);
                _horizontalScroll.current.scrollTo({
                  x: scrollTo[index],
                  y: 0,
                  animated: true,
                });
              }}
              active={activeScreen === index}
            >
              <ScreenText active={activeScreen === index}>{value}</ScreenText>
              {activeScreen === index && (
                <Line
                  color={colors.white}
                  weight="3px"
                  width="85%"
                  marginTop="5px"
                  marginBottom="0px"
                />
              )}
            </ScreenButton>
          );
        })}
      </HorizontalScroll>

      <Swiper
        height="auto"
        ref={_swiper}
        autoplay={false}
        loop={false}
        showsButtons={false}
        showsPagination={false}
        onIndexChanged={(index) => {
          _horizontalScroll.current.scrollTo({
            x: scrollTo[index],
            y: 0,
            animated: true,
          });
          setActiveScreen(index);
        }}
      >
        <BasicInformations />
        {/* <Deliveries />
        <Payments />
        <Settings /> */}
      </Swiper>

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
