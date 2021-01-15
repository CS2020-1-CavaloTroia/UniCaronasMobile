import { combineReducers } from "redux";

import socket from "./socket/reducer";
import auth from "./auth/reducer";
import driver from "./driver/reducer";
import passenger from "./passenger/reducer";
import race from "./race/reducer";
import modal from "./modal/reducer";
import network from "./network/reducer";

export default combineReducers({
  socket,
  auth,
  driver,
  passenger,
  race,
  modal,
  network,
});
