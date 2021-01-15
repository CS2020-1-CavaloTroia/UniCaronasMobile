import produce from "immer";

const INITIAL_STATE = {
  awaitingRaces: null,
  inProgressRaces: null,
};

export default function passenger(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@passenger/RACES_SUCCESS": {
        draft.awaitingRaces = action.payload.awaitingRaces;
        draft.inProgressRaces = action.payload.inProgressRaces;
        break;
      }
    }
  });
}
