import produce from "immer";

const INITIAL_STATE = {
  token: null,
  loading: false,
  thumbnail: null,
  _id: null,
  googleUID: "",
  name: "",
  type: "",
  phoneNumber: "",
  latitude: null,
  longitude: null,
  heading: null,
  firebaseNotificationToken: "",
  getUser: false,
  cpf: "",
  CNHDocument: null,
  profileStatus: null,
  vehicleBoard: "",
  vehicleModel: "",
  vehicleColor: "",
  loadingUpdateProfile: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@auth/SIGNIN_REQUEST": {
        draft.loading = true;
        break;
      }

      case "@auth/USER_REQUEST": {
        draft.loading = true;
        break;
      }

      case "@auth/USER_SUCCESS": {
        draft.loading = false;
        draft.getUser = true;
        draft.name = action.payload.name;
        draft.thumbnail = action.payload.thumbnail;
        draft.cpf = action.payload.cpf;
        draft.CNHDocument = action.payload.CNHDocument;
        break;
      }

      case "@auth/SET_USER": {
        draft.loading = false;
        draft.getUser = false;
        draft.name = "";
        draft.thumbnail = null;
        draft.cpf = "";
        draft.CNHDocument = null;
        break;
      }

      case "@auth/USER_FAILURE": {
        draft.loading = false;
        break;
      }

      case "@auth/SIGNIN_SUCCESS": {
        draft._id = action.payload._id;
        draft.googleUID = action.payload.googleUID;
        draft.thumbnail = action.payload.thumbnail;
        draft.name = action.payload.name;
        draft.type = action.payload.type;
        draft.phoneNumber = action.payload.phoneNumber;
        draft.loading = false;
        draft.getUser = false;
        draft.firebaseNotificationToken =
          action.payload.firebaseNotificationToken;
        draft.token = action.payload.token;
        draft.cpf = action.payload.cpf;
        draft.CNHDocument = action.payload.CNHDocument;
        draft.profileStatus = action.payload.profileStatus;
        draft.vehicleBoard = action.payload.vehicleBoard;
        draft.vehicleModel = action.payload.vehicleModel;
        draft.vehicleColor = action.payload.vehicleColor;
        break;
      }

      case "@auth/SIGNIN_FAILURE": {
        draft.loading = false;
        break;
      }

      case "@auth/SIGNOUT": {
        draft._id = null;
        draft.googleUID = "";
        draft.thumbnail = null;
        draft.name = "";
        draft.type = "";
        draft.phoneNumber = "";
        draft.firebaseNotificationToken = "";
        draft.token = null;
        draft.getUser = false;
        draft.cpf = "";
        draft.CNHDocument = null;
        draft.profileStatus = null;
        draft.vehicleBoard = "";
        draft.vehicleModel = "";
        draft.vehicleColor = "";
        break;
      }

      case "@auth/UPDATE_FIREBASE_TOKEN_REQUEST": {
        draft.loading = true;
        break;
      }

      case "@auth/UPDATE_FIREBASE_TOKEN_SUCCESS": {
        draft.firebaseNotificationToken = action.payload.token;
        draft.loading = false;
        break;
      }

      case "@auth/CHANGE_PROFILE_IMAGE_REQUEST": {
        draft.loading = true;
        break;
      }

      case "@auth/CHANGE_PROFILE_IMAGE_FAILURE": {
        draft.loading = false;
        break;
      }

      case "@auth/CHANGE_PROFILE_IMAGE_SUCCESS": {
        draft.thumbnail = action.payload.url;
        draft.loading = false;
        break;
      }

      case "@auth/GET_PROFILE_STATUS_SUCCESS": {
        draft.profileStatus = action.payload.status;
        break;
      }

      case "@auth/UPDATE_BASIC_INFORMATIONS_REQUEST": {
        draft.loadingUpdateProfile = true;
        break;
      }

      case "@auth/UPDATE_BASIC_INFORMATIONS_SUCCESS": {
        draft.name = action.payload.name;
        draft.vehicleBoard = action.payload.vehicleBoard;
        draft.vehicleModel = action.payload.vehicleModel;
        draft.vehicleColor = action.payload.vehicleColor;
        draft.loadingUpdateProfile = false;
        break;
      }

      case "@auth/UPDATE_BASIC_INFORMATIONS_FAILURE": {
        draft.loadingUpdateProfile = false;
        break;
      }
    }
  });
}
