import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  dashBordDetail: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_DASHBOARD_INITIATED:
      return {
        ...state,
        message: false,
        error: false,
        loading: true,
      };
    case actions.GET_DASHBOARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        dashBordDetail: action.payload.data,
      };
    case actions.GET_DASHBOARD_ERROR:
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
