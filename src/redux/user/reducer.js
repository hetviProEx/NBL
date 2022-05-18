import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isSaved: false,
  isDeleted: false,
  user: {},
  userRights: [],
  userList: [],
  userById: [],
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_USER_RIGHTS_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_USER_RIGHTS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        userRights: action.payload.data,
      };
    case actions.GET_USER_RIGHTS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.SAVE_USER_INITIATED:
      return {
        isSaved: false,
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_USER_SUCCESS:
      return {
        ...state,
        isSaved: true,
        loading: false,
        error: false,
      };
    case actions.SAVE_USER_ERROR:
      return {
        ...state,
        isSaved: false,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_USERS_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        userList: action.payload.data,
      };
    case actions.GET_USERS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_USER_INITIATED:
      return {
        isDeleted: false,
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.DELETE_USER_SUCCESS:
      return {
        ...state,
        isDeleted: true,
        loading: false,
        error: false,
        userRights: action.payload.data,
      };
    case actions.DELETE_USER_ERROR:
      return {
        ...state,
        isDeleted: false,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_USER_BY_ID_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_USER_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        userById: action.payload.data,
      };
    case actions.GET_USER_BY_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    default:
      return state;
  }
};
