import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAdded: false,
  isDeleted: false,
  products: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_PRODUCT_INITIATED:
      return {
        ...state,
        error: false,
        isAdded: false,
        message: false,
        loading: true,
      };
    case actions.SAVE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.SAVE_PRODUCT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isAdded: false,
        message: action.error,
      };
    case actions.GET_PRODUCT_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        products: action.payload.data,
      };
    case actions.GET_PRODUCT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_PRODUCT_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_PRODUCT_ERROR:
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
