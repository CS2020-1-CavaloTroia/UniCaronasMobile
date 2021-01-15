import produce from "immer";

const INITIAL_STATE = {
  title: "",
  message: "",
  icon: "",
  animation: "shake",
  open: false,
  leftAction: null,
  rightAction: null,
};

export default function modal(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@modal/OPEN_MODAL": {
        draft.title = action.payload.title;
        draft.message = action.payload.message;
        draft.icon = action.payload.icon;
        draft.animation = action.payload.animation;
        draft.leftAction = action.payload.leftAction;
        draft.rightAction = action.payload.rightAction;
        draft.open = true;
        break;
      }

      case "@modal/CLOSE_MODAL": {
        draft.open = false;
        break;
      }
    }
  });
}
