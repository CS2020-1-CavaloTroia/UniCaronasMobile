import { takeLatest, call, put, all, select } from "redux-saga/effects";
import api from "~/config/api";
import { racesSuccess } from "./actions";

function* races() {
  const driverId = yield select((state) => state.auth._id);
  const token = yield select((state) => state.auth.token);
  const firebaseNotificationToken = yield select(
    (state) => state.auth.firebaseNotificationToken
  );

  api.defaults.headers["access-token"] = token;

  const body = {
    driver: driverId,
  };

  try {
    const response = yield call(api.post, `/driver/races`, body);

    const awaitingRaces = [];

    for (i = 0; i < response.data.awaiting.length; i++) {
      if (
        response.data.awaiting[i].sentTo === "all" ||
        response.data.awaiting[i].sentTo === firebaseNotificationToken
      )
        awaitingRaces.push(response.data.awaiting[i]);
    }

    const data = {
      inProgress: response.data.inProgress,
      awaiting: awaitingRaces,
    };

    yield put(racesSuccess(data.awaiting, data.inProgress));
  } catch (err) {
    console.log(err);
  }
}

export default all([takeLatest("@driver/RACES_REQUEST", races)]);
