import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isSaved: false,
  isDeleted: false,
  commission: [],
  commissionList: [],
  commissionById:{},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_COMMISSION_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isSaved: false,
        loading: true,
      };
    case actions.SAVE_COMMISSION_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_COMMISSION_ERROR:
      return {
        ...state,
        error: true,
        isSaved: false,
        loading: false,
        message: action.error,
      };
    case actions.GET_COMMISSION_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_COMMISSION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        commission: action.payload.data,
      };
    case actions.GET_COMMISSION_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_COMMISSION_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_COMMISSION_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_COMMISSION_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
      case actions.SAVE_COMMISSION_MANAGE_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isSaved: false,
        loading: true,
      };
    case actions.SAVE_COMMISSION_MANAGE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_COMMISSION_MANAGE_ERROR:
      return {
        ...state,
        error: true,
        isSaved: false,
        loading: false,
        message: action.error,
      };
      case actions.GET_COMMISSION_MANAGE_INITIATED:
        return {
          ...state,
          error: false,
          message: false,
          loading: true,
        };
      case actions.GET_COMMISSION_MANAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          commissionList: action.payload.data,
        };
      case actions.GET_COMMISSION_MANAGE_ERROR:
        return {
          ...state,
          error: true,
          loading: false,
          message: action.error,
        };
      case actions.GET_COMMISSION_BY_ID_INITIATED :
        return {
          ...state,
          error: false,
          message: false,
          loading: true,
        };
      case actions.GET_COMMISSION_BY_ID_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          commissionById: action.payload.data,
        };
      case actions.GET_COMMISSION_BY_ID_ERROR:
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
