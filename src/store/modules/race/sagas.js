import { takeLatest, call, put, all, select } from "redux-saga/effects";
import auth from "@react-native-firebase/auth";
import api from "~/config/api";
import { racesSuccess, createRaceSuccess, clearRoute } from "./actions";
import openMap from "react-native-open-maps";
import { Linking } from "react-native";

function* createRace({ payload }) {
  const {
    initialLocation,
    finalLocation,
    address,
    route,
    distance,
    duration,
  } = yield select((state) => state.race);
  const passengerId = yield select((state) => state.auth._id);
  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const initiated_at = new Date();

  const body = {
    passenger: passengerId,
    initialLocation,
    finalLocation,
    initiated_at: initiated_at.getTime(),
    address,
    route,
    distance,
    duration,
  };

  try {
    const response = yield call(api.post, `/race/create`, body);

    yield put(createRaceSuccess(response.data));
    yield put(clearRoute());
  } catch (err) {
    console.log(err);
  }
}

function* goToPassengerRace({ payload }) {
  const { raceId, race, navigation } = payload;
  const driverId = yield select((state) => state.auth._id);
  const { latitude, longitude } = yield select((state) => state.driver);

  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const body = {
    raceId,
    driver: driverId,
  };

  try {
    const response = yield call(api.post, `/race/gotopassenger`, body);

    if (response.status === 200) {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${race.initialLocation.latitude} ${race.initialLocation.longitude}&origin=${latitude} ${longitude}&travelmode=driving&zoom=15`
      );
      navigation.navigate("RaceInProgress");
    } else console.log("Corrida aceita por outro motorista.");
  } catch (err) {
    console.log(err);
  }
}

function* startRace({ payload }) {
  const { raceId, race } = payload;
  const driverId = yield select((state) => state.auth._id);
  const { latitude, longitude } = yield select((state) => state.driver);

  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const body = {
    raceId,
    driver: driverId,
  };

  try {
    const response = yield call(api.post, `/race/startRace`, body);

    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&destination=${race.finalLocation.latitude} ${race.finalLocation.longitude}&origin=${latitude} ${longitude}&travelmode=driving&zoom=15`
    );
  } catch (err) {
    console.log(err);
  }
}

function* finishRace({ payload }) {
  const { raceId } = payload;
  const driverId = yield select((state) => state.auth._id);

  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const body = {
    raceId,
    driver: driverId,
  };

  try {
    yield call(api.post, `/race/finishRace`, body);
  } catch (err) {
    console.log(err);
  }
}

function* cancelRace({ payload }) {
  const { raceId } = payload;
  const driver = yield select((state) => state.auth._id);

  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const body = {
    raceId,
    driver: driverId,
  };

  try {
    yield call(api.post, `/race/cancel`, body);
  } catch (err) {
    console.log(err);
  }
}

function* removeRace({ payload }) {
  const { raceId } = payload;
  const passengerId = yield select((state) => state.auth._id);

  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const body = {
    raceId,
    passenger: passengerId,
  };

  try {
    yield call(api.post, `/race/remove`, body);
  } catch (err) {
    console.log(err);
  }
}

export default all([
  takeLatest("@race/CREATE_RACE_REQUEST", createRace),
  takeLatest("@race/GOTO_PASSENGER_RACE_REQUEST", goToPassengerRace),
  takeLatest("@race/START_RACE_REQUEST", startRace),
  takeLatest("@race/FINISH_RACE_REQUEST", finishRace),
  takeLatest("@race/CANCEL_RACE_REQUEST", cancelRace),
  takeLatest("@race/REMOVE_RACE_REQUEST", removeRace),
]);
