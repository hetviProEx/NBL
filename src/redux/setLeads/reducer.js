import * as actions from "./constant";

const initialState = {
  error: false,
  loading: false,
  message: false,
  setLeads: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_PROSPECT_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
        setLeads: false,
      };
    case actions.SET_PROSPECT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        setLeads: true,
      };
    case actions.SET_PROSPECT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        setLeads: false,
        message: action.error,
      };
    case actions.SET_LEAD_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
        setLeads: false,
      };
    case actions.SET_LEAD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        setLeads: true,
      };
    case actions.SET_LEAD_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        setLeads: false,
        message: action.error,
      };
    case actions.SET_DEMO_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
        setLeads: false,
      };
    case actions.SET_DEMO_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        setLeads: true,
      };
    case actions.SET_DEMO_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        setLeads: false,
        message: action.error,
      };

    default:
      return state;
  }
};
