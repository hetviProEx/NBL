import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isDeleted: false,
  isSaved: false,
  poc: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_POC_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isSaved: false,
        loading: true,
      };
    case actions.SAVE_POC_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_POC_ERROR:
      return {
        ...state,
        error: true,
        isSaved: false,
        loading: false,
        message: action.error,
      };
    case actions.GET_POC_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_POC_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        poc: action.payload.data,
      };
    case actions.GET_POC_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_POC_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_POC_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_POC_ERROR:
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
