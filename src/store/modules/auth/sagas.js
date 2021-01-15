import { takeLatest, call, put, all, select } from "redux-saga/effects";
import auth from "@react-native-firebase/auth";
import {
  signinSuccess,
  signinFailure,
  updateFirebaseTokenSuccess,
  userSuccess,
  getUserFailure,
  changeProfileImageSuccess,
  changeProfileImageFailure,
  getProfileStatusSuccess,
  updateBasicInformationsSuccess,
  updateBasicInformationsFailure,
} from "./actions";
import api from "~/config/api";

function* changeProfileImage({ payload }) {
  const { file } = payload;
  const _id = yield select((state) => state.auth._id);
  const type = yield select((state) => state.auth.type);

  const newData = {
    uri: file.path,
    type: file.mime,
    name: `${_id}.${file.name}`,
  };

  const formData = new FormData();

  formData.append("file", newData);
  formData.append("_id", _id);

  try {
    const response = yield api.post(`/${type}/updateprofile`, formData);

    yield put(changeProfileImageSuccess(response.data));
  } catch (err) {
    console.log(err);
    yield put(changeProfileImageFailure());
  }
}

function* signin({ payload }) {
  const {
    name,
    phoneNumber,
    type,
    googleUID,
    cpf,
    CNHDocument,
    profileImage,
  } = payload;

  let body = {
    name,
    phoneNumber,
    googleUID,
  };

  if (type === "driver") {
    body.cpf = cpf;
  }

  try {
    const response = yield call(api.post, `/${type}/signin`, body);

    const data = {
      name: response.data.name,
      googleUID: response.data.googleUID,
      _id: response.data._id,
      phoneNumber: response.data.phoneNumber,
      thumbnail: response.data.thumbnail,
      firebaseNotificationToken: response.data.firebaseNotificationToken,
      token: response.data.token,
      type,
      cpf: response.data.cpf,
      profileStatus: response.data.profileStatus,
      vehicleBoard: response.data.vehicleBoard,
      vehicleModel: response.data.vehicleModel,
      vehicleColor: response.data.vehicleColor,
    };

    if (profileImage) {
      const profileImageformData = new FormData();
      profileImageformData.append("file", {
        uri: profileImage.image,
        type: profileImage.mime,
        name: profileImage.name,
      });
      profileImageformData.append("_id", data._id);

      const urlProfileImage = yield call(
        api.post,
        `/${type}/updateprofile`,
        profileImageformData
      );

      data.thumbnail = urlProfileImage.data;
    }

    if (CNHDocument) {
      const CNHformData = new FormData();
      CNHformData.append("file", {
        uri: CNHDocument.image,
        type: CNHDocument.mime,
        name: CNHDocument.name,
      });
      CNHformData.append("_id", data._id);

      const urlCNH = yield call(api.post, `/driver/updatecnh`, CNHformData);

      data.CNHDocument = urlCNH.data;
    }

    yield put(
      signinSuccess(
        data.name,
        data.phoneNumber,
        data.googleUID,
        data._id,
        data.type,
        data.thumbnail,
        data.firebaseNotificationToken,
        data.token,
        data.cpf,
        data.CNHDocument,
        data.profileStatus,
        data.vehicleBoard,
        data.vehicleModel,
        data.vehicleColor
      )
    );

    yield auth().signOut();
  } catch (err) {
    yield put(signinFailure());
    console.log(err);
  }
}

function* userRequest({ payload }) {
  const { type, phoneNumber, googleUID } = payload;

  const body = {
    type,
    phoneNumber,
    googleUID,
  };

  try {
    const response = yield call(api.post, `/${type}/user`, body);

    if (response.data)
      yield put(
        userSuccess(
          response.data.name,
          response.data.thumbnail_url,
          response.data.cpf,
          response.data.CNHDocument
        )
      );
    else yield put(userSuccess());
  } catch (err) {
    yield put(getUserFailure());
    console.log(err);
  }
}

function* updateFirebaseToken({ payload }) {
  const { token: firebaseNotificationToken } = payload;
  const _id = yield select((state) => state.auth._id);
  const type = yield select((state) => state.auth.type);
  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const body = {
    _id,
    firebaseNotificationToken,
  };

  try {
    const response = yield call(
      api.post,
      `/${type}/subscribeToNotifications`,
      body
    );

    yield put(updateFirebaseTokenSuccess(response.data));
  } catch (err) {
    console.log(err);
  }
}

function* getProfileStatus() {
  const _id = yield select((state) => state.auth._id);
  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const body = {
    _id,
  };

  try {
    const response = yield call(api.post, `/driver/getprofilestatus`, body);

    yield put(getProfileStatusSuccess(response.data.profileStatus));
  } catch (err) {
    console.log(err);
  }
}

function* updateBasicInformations({ payload }) {
  const _id = yield select((state) => state.auth._id);
  const token = yield select((state) => state.auth.token);
  const { name, vehicleBoard, vehicleModel, vehicleColor } = payload;

  api.defaults.headers["access-token"] = token;

  const body = {
    _id,
    name,
    vehicleBoard,
    vehicleModel,
    vehicleColor,
  };

  try {
    const response = yield call(
      api.post,
      `/driver/updatebasicinformations`,
      body
    );

    yield put(
      updateBasicInformationsSuccess(
        name,
        vehicleBoard,
        vehicleModel,
        vehicleColor
      )
    );
  } catch (err) {
    yield put(updateBasicInformationsFailure());
  }
}

export default all([
  takeLatest("@auth/SIGNIN_REQUEST", signin),
  takeLatest("@auth/USER_REQUEST", userRequest),
  takeLatest("@auth/UPDATE_FIREBASE_TOKEN_REQUEST", updateFirebaseToken),
  takeLatest("@auth/CHANGE_PROFILE_IMAGE_REQUEST", changeProfileImage),
  takeLatest("@auth/GET_PROFILE_STATUS_REQUEST", getProfileStatus),
  takeLatest(
    "@auth/UPDATE_BASIC_INFORMATIONS_REQUEST",
    updateBasicInformations
  ),
]);
