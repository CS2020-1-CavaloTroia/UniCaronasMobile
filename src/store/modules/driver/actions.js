export function setLocation(latitude, longitude, heading) {
  return {
    type: "@driver/SET_LOCATION",
    payload: { latitude, longitude, heading },
  };
}

export function racesRequest() {
  return {
    type: "@driver/RACES_REQUEST",
  };
}

export function racesSuccess(awaiting, inProgress) {
  return {
    type: "@driver/RACES_SUCCESS",
    payload: { awaiting, inProgress },
  };
}

export function setConnectedDrivers(connectedDrivers) {
  return {
    type: "@driver/SET_CONNECTED_DRIVERS",
    payload: { connectedDrivers },
  };
}
