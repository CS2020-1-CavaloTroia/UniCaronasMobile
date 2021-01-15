import produce from "immer";

const INITIAL_STATE = {
  socket: null,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@socket/SET_WEB_SOCKET_CONNECTION": {
        draft.socket = action.payload.socket;
        break;
      }
    }
  });
}
