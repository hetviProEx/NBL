import * as actions from "./constant";
const initialState = {
  error: false,
  isAuthenticated: false,  
  loading: false,
  message: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_INITIATED:
      return {
        ...state,
        isAuthenticated: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isAuthenticated: true,
      };
    case actions.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isAuthenticated: false,
        message: action.error,
      };
    case actions.SET_AUTH_INITIATED:
      return {
        ...state,
        isAuthenticated: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SET_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isAuthenticated: true,
      };
    case actions.SET_AUTH_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        isAuthenticated: false,
        message: action.error,
      };
    case actions.LOGOUT_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.LOGOUT:
      return {
        ...state,
        error: false,
        isAuthenticated: false,
        loading: false,
        message: false,
      };
    case actions.LOGOUT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: false,
      };
      case actions.FORGET_PASSWORD_INITIATED:
        return {
          ...state,
          message:false,
          error: false,
          loading: true,
        };
      case actions.FORGET_PASSWORD_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
        };
      case actions.FORGET_PASSWORD_ERROR:
        return {
          ...state,
          loading: false,
          error: true,
          message: action.error,
        };
    default:
      return state;
  }
};
