export function setUserType(type) {
  return {
    type: "@auth/SET_USER_TYPE",
    payload: { type },
  };
}

export function setUser() {
  return {
    type: "@auth/SET_USER",
  };
}

export function signinRequest(
  name,
  phoneNumber,
  googleUID,
  type,
  cpf,
  CNHDocument,
  criminalRecord,
  profileImage
) {
  return {
    type: "@auth/SIGNIN_REQUEST",
    payload: {
      name,
      phoneNumber,
      googleUID,
      type,
      cpf,
      CNHDocument,
      criminalRecord,
      profileImage,
    },
  };
}

export function signinSuccess(
  name,
  phoneNumber,
  googleUID,
  _id,
  type,
  thumbnail,
  firebaseNotificationToken,
  token,
  cpf,
  CNHDocument,
  criminalRecord,
  profileStatus,
  vehicleBoard,
  vehicleModel,
  vehicleColor
) {
  return {
    type: "@auth/SIGNIN_SUCCESS",
    payload: {
      name,
      phoneNumber,
      googleUID,
      _id,
      type,
      thumbnail,
      firebaseNotificationToken,
      token,
      cpf,
      CNHDocument,
      criminalRecord,
      profileStatus,
      vehicleBoard,
      vehicleModel,
      vehicleColor,
    },
  };
}

export function signinFailure() {
  return {
    type: "@auth/SIGNIN_FAILURE",
  };
}

export function signout() {
  return {
    type: "@auth/SIGNOUT",
  };
}

export function updateFirebaseTokenRequest(token) {
  return {
    type: "@auth/UPDATE_FIREBASE_TOKEN_REQUEST",
    payload: { token },
  };
}

export function updateFirebaseTokenSuccess(token) {
  return {
    type: "@auth/UPDATE_FIREBASE_TOKEN_SUCCESS",
    payload: { token },
  };
}

export function userRequest(type, phoneNumber, googleUID) {
  return {
    type: "@auth/USER_REQUEST",
    payload: { type, phoneNumber, googleUID },
  };
}

export function userSuccess(
  name = "",
  thumbnail = null,
  cpf = "",
  CNHDocument = null,
  criminalRecord = null
) {
  return {
    type: "@auth/USER_SUCCESS",
    payload: { name, thumbnail, cpf, CNHDocument, criminalRecord },
  };
}

export function getUserFailure() {
  return {
    type: "@auth/USER_FAILURE",
  };
}

export function changeProfileImageRequest(file) {
  return {
    type: "@auth/CHANGE_PROFILE_IMAGE_REQUEST",
    payload: { file },
  };
}

export function changeProfileImageSuccess(url) {
  return {
    type: "@auth/CHANGE_PROFILE_IMAGE_SUCCESS",
    payload: { url },
  };
}

export function changeProfileImageFailure() {
  return {
    type: "@auth/CHANGE_PROFILE_IMAGE_FAILURE",
  };
}

export function getProfileStatusRequest() {
  return {
    type: "@auth/GET_PROFILE_STATUS_REQUEST",
  };
}

export function getProfileStatusSuccess(status) {
  return {
    type: "@auth/GET_PROFILE_STATUS_SUCCESS",
    payload: { status },
  };
}

export function updateBasicInformationsRequest(
  name,
  vehicleBoard,
  vehicleModel,
  vehicleColor
) {
  return {
    type: "@auth/UPDATE_BASIC_INFORMATIONS_REQUEST",
    payload: { name, vehicleBoard, vehicleModel, vehicleColor },
  };
}

export function updateBasicInformationsSuccess(
  name,
  vehicleBoard,
  vehicleModel,
  vehicleColor
) {
  return {
    type: "@auth/UPDATE_BASIC_INFORMATIONS_SUCCESS",
    payload: { name, vehicleBoard, vehicleModel, vehicleColor },
  };
}

export function updateBasicInformationsFailure() {
  return {
    type: "@auth/UPDATE_BASIC_INFORMATIONS_FAILURE",
  };
}
