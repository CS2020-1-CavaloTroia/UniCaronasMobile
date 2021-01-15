import { takeLatest, call, put, all, select } from "redux-saga/effects";
import api from "~/config/api";
import { racesSuccess } from "./actions";

function* races() {
  const passengerId = yield select((state) => state.auth._id);
  const token = yield select((state) => state.auth.token);

  api.defaults.headers["access-token"] = token;

  const body = {
    passenger: passengerId,
  };

  try {
    const response = yield call(api.post, `/passenger/races`, body);

    const data = {
      inProgress: response.data.inProgress,
      awaiting: response.data.awaiting,
    };

    yield put(racesSuccess(data.awaiting, data.inProgress));
  } catch (err) {
    console.log(err);
  }
}

export default all([takeLatest("@passenger/RACES_REQUEST", races)]);
