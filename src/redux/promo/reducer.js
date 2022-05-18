import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isSaved: false,
  isDeleted: false,
  promoCodes: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_PROMOCODE_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isSaved: false,
        loading: true,
      };
    case actions.SAVE_PROMOCODE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_PROMOCODE_ERROR:
      return {
        ...state,
        error: true,
        isSaved: false,
        loading: false,
        message: action.error,
      };
    case actions.GET_PROMO_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PROMO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        promoCodes: action.payload.data,
      };
    case actions.GET_PROMO_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_PROMO_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_PROMO_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_PROMO_ERROR:
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
