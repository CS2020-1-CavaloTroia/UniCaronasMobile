export function racesRequest() {
  return {
    type: "@passenger/RACES_REQUEST",
  };
}

export function racesSuccess(awaitingRaces, inProgressRaces) {
  return {
    type: "@passenger/RACES_SUCCESS",
    payload: { awaitingRaces, inProgressRaces },
  };
}
