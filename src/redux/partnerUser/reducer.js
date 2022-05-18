import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAdded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_CONTACTUS_INITIATED:
      return {
        ...state,
        error: false,
        isAdded: false,
        message: false,
        loading: true,
      };
    case actions.SAVE_CONTACTUS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.SAVE_CONTACTUS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isAdded: false,
        message: action.error,
      };
    case actions.SAVE_SUPPORT_INITIATED:
      return {
        ...state,
        error: false,
        isAdded: false,
        message: false,
        loading: true,
      };
    case actions.SAVE_SUPPORT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.SAVE_SUPPORT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isAdded: false,
        message: action.error,
      };
    default:
      return state;
  }
};
