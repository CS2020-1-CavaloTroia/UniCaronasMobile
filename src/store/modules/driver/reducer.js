import produce from "immer";

const INITIAL_STATE = {
  connectedDrivers: null,
  latitude: null,
  longitude: null,
  heading: null,
  online: false,
  awaitingRaces: null,
  inProgressRace: null,
};

export default function driver(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@driver/SET_LOCATION": {
        draft.latitude = action.payload.latitude;
        draft.longitude = action.payload.longitude;
        draft.heading = action.payload.heading;
        break;
      }

      case "@driver/RACES_SUCCESS": {
        draft.awaitingRaces = action.payload.awaiting;
        draft.inProgressRace = action.payload.inProgress;
        break;
      }

      case "@driver/SET_CONNECTED_DRIVERS": {
        draft.connectedDrivers = action.payload.connectedDrivers;
        break;
      }
    }
  });
}
