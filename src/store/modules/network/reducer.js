import produce from "immer";

const INITIAL_STATE = {
  networkInfo: false,
};

export default function network(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@network/SET_NETWORK_INFO": {
        draft.networkInfo = action.payload.networkInfo;
        break;
      }
    }
  });
}
