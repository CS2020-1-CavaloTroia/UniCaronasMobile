export function createRaceRequest() {
  return {
    type: "@race/CREATE_RACE_REQUEST",
  };
}

export function createRaceSuccess(race) {
  return {
    type: "@race/CREATE_RACE_SUCCESS",
    payload: { race },
  };
}

export function createRaceFailure() {
  return {
    type: "@race/CREATE_RACE_FAILURE",
  };
}

export function setRace(
  initialLocation,
  finalLocation,
  address,
  route,
  distance,
  duration
) {
  return {
    type: "@race/SET_RACE",
    payload: {
      initialLocation,
      finalLocation,
      address,
      route,
      distance,
      duration,
    },
  };
}

export function setDestination(destination) {
  return {
    type: "@race/SET_DESTINATION",
    payload: { destination },
  };
}

export function clearRoute() {
  return {
    type: "@race/CLEAR_ROUTE",
  };
}

export function goToPassengerRaceRequest(raceId, race, navigation) {
  return {
    type: "@race/GOTO_PASSENGER_RACE_REQUEST",
    payload: { raceId, race, navigation },
  };
}

export function startRaceRequest(raceId, race) {
  return {
    type: "@race/START_RACE_REQUEST",
    payload: { raceId, race },
  };
}

export function finishRaceRequest(raceId, race) {
  return {
    type: "@race/FINISH_RACE_REQUEST",
    payload: { raceId, race },
  };
}

export function cancelRaceRequest(raceId) {
  return {
    type: "@race/CANCEL_RACE_REQUEST",
    payload: { raceId },
  };
}

export function removeRaceRequest(raceId) {
  return {
    type: "@race/REMOVE_RACE_REQUEST",
    payload: { raceId },
  };
}
