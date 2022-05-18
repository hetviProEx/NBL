import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isSaved: false,
  isDeleted: false,
  demo: [],
  leads: [],
  sales: [],
  sale:{},
  prospect: [],
  customer: [],
  leadType: [],
  products: [],
  custProduct: [],
  leadCustomers: [],
  partnerProduct: [],
  productSubscript: [],
  salesDash: [],
  leadsMeeting: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_PROSPECT_INITIATED:
      return {
        ...state,
        isSaved: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_PROSPECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSaved: true,
      };
    case actions.SAVE_PROSPECT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.GET_PROSPECT_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PROSPECT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        prospect: action.payload.data,
      };
    case actions.GET_PROSPECT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_PROSPECT_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_PROSPECT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_PROSPECT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.GET_CUSTOMER_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        customer: action.payload.data,
      };
    case actions.GET_CUSTOMER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_LEAD_TYPE_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_LEAD_TYPE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        leadType: action.payload.data,
      };
    case actions.GET_LEAD_TYPE_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
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
        loading: false,
        error: true,
        message: action.error,
      };
    case actions.SAVE_LEADS_INITIATED:
      return {
        ...state,
        error: false,
        isSaved: false,
        message: false,
        loading: true,
      };
    case actions.SAVE_LEADS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_LEADS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.GET_LEADS_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_LEADS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        leads: action.payload.data,
      };
    case actions.GET_LEADS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_LEAD_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_LEAD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_LEAD_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.GET_PRODUCT_BY_CUSTOMER_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PRODUCT_BY_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        custProduct: action.payload.data,
      };
    case actions.GET_PRODUCT_BY_CUSTOMER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.SAVE_DEMO_INITIATED:
      return {
        ...state,
        error: false,
        isSaved: false,
        message: false,
        loading: true,
      };
    case actions.SAVE_DEMO_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_DEMO_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.GET_DEMO_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_DEMO_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        demo: action.payload.data,
      };
    case actions.GET_DEMO_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_DEMO_INITIATED:
      return {
        ...state,
        error: false,
        loading: true,
        message: false,
        isDeleted: false,
      };
    case actions.DELETE_DEMO_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_DEMO_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.GET_PARTNER_PRODUCT_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PARTNER_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        partnerProduct: action.payload.data,
      };
    case actions.GET_PARTNER_PRODUCT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_PRODUCT_SUBSCRIPTION_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PRODUCT_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        productSubscript: action.payload.data,
      };
    case actions.GET_PRODUCT_SUBSCRIPTION_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_LEAD_CUSTOMER_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_LEAD_CUSTOMER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        leadCustomers: action.payload.data,
      };
    case actions.GET_LEAD_CUSTOMER_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.SAVE_SALES_INITIATED:
      return {
        ...state,
        error: false,
        isSaved: false,
        message: false,
        loading: true,
      };
    case actions.SAVE_SALES_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isSaved: true,
      };
    case actions.SAVE_SALES_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.GET_SALES_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_SALES_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        sales: action.payload.data,
      };
    case actions.GET_SALES_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_SALES_BY_ID_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_SALES_BY_ID_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        sale: action.payload.data,
      };
    case actions.GET_SALES_BY_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
      case actions.DELETE_SALES_INITIATED:
        return {
          ...state,
          error: false,
          message: false,
          isDeleted: false,
          loading: true,
        };
      case actions.DELETE_SALES_SUCCESS:
        return {
          ...state,
          error: false,
          loading: false,
          isDeleted: true,
        };
      case actions.DELETE_SALES_ERROR:
        return {
          ...state,
          error: true,
          loading: false,
          isDeleted: false,
          message: action.error,
        };
    case actions.GET_SALES_DASHBOARD_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_SALES_DASHBOARD_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        salesDash: action.payload.data,
      };
    case actions.GET_SALES_DASHBOARD_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.IMPORT_PROSPECT_INITIATED:
      return {
        ...state,
        isSaved: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.IMPORT_PROSPECT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSaved: true,
      };
    case actions.IMPORT_PROSPECT_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.GET_LEADS_MEETING_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_LEADS_MEETING_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        leadsMeeting: action.payload.data,
      };
    case actions.GET_LEADS_MEETING_ERROR:
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
