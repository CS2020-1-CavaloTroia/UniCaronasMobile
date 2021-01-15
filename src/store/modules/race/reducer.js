import produce from "immer";

const INITIAL_STATE = {
  currentRace: null,
  loading: false,
  destination: null,
  initialLocation: null,
  finalLocation: null,
  address: { number: "", street: "" },
  route: null,
  distance: "",
  duration: "",
};

export default function race(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@race/CREATE_RACE_REQUEST": {
        draft.loading = true;
        break;
      }

      case "@race/CREATE_RACE_SUCCESS": {
        draft.currentRace = action.payload.race;
        draft.loading = false;
        break;
      }

      case "@race/CREATE_RACE_FAILURE": {
        draft.loading = false;
        break;
      }

      case "@race/SET_DESTINATION": {
        draft.destination = action.payload.destination;
        break;
      }

      case "@race/SET_RACE": {
        draft.initialLocation = action.payload.initialLocation;
        draft.finalLocation = action.payload.finalLocation;
        draft.address = action.payload.address;
        draft.route = action.payload.route;
        draft.distance = action.payload.distance;
        draft.duration = action.payload.duration;
        break;
      }

      case "@race/CLEAR_ROUTE": {
        draft.destination = null;
        draft.route = null;
        draft.distance = "";
        draft.duration = "";
        draft.address = { number: "", street: "" };
        break;
      }
    }
  });
}
