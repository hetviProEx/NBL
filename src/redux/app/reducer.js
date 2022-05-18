import * as actions from "./constant";
const initialState = {
  loading: false,
  error: false,
  message: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ERROR_HANDLER:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.payload,
      };
    case actions.ERROR_EMPTY:
      return {
        ...state,
        error: null,
        loading: false,
        message: "",
      };
    case actions.LOADER_STATUS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
