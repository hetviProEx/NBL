import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isSaved: false,
  isDeleted: false,
  media: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_MEDIA_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isSaved: false,
        loading: true,
      };
    case actions.SAVE_MEDIA_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_MEDIA_ERROR:
      return {
        ...state,
        error: true,
        isSaved: false,
        loading: false,
        message: action.error,
      };
    case actions.GET_MEDIA_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_MEDIA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        media: action.payload.data,
      };
    case actions.GET_MEDIA_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_MEDIA_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_MEDIA_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_MEDIA_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    default:
      return state;
  }
};
