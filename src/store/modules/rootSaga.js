import { all } from "redux-saga/effects";

import socket from "./socket/sagas";
import auth from "./auth/sagas";
import driver from "./driver/sagas";
import passenger from "./passenger/sagas";
import race from "./race/sagas";
import modal from "./modal/sagas";
import network from "./network/sagas";

export default function* rootReducer() {
  return yield all([socket, auth, driver, passenger, race, modal, network]);
}
