import * as actions from "./constant";
const initialState = {
  error: false,
  loading: false,
  message: false,
  isAdded: false,
  isDeleted: false,
  trHistory: [],
  currBal: [],
  walletData: {},
  withdrawList: [],
  PartTransaction: [],
  withdrawRequests: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_WITHDARAW_MONEY_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isAdded: false,
        loading: true,
      };
    case actions.ADD_WITHDARAW_MONEY_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.ADD_WITHDARAW_MONEY_ERROR:
      return {
        ...state,
        error: true,
        isAdded: false,
        loading: false,
        message: action.error,
      };
    case actions.TARANSACTION_HISTORY_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.TARANSACTION_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        trHistory: action.payload.data,
      };
    case actions.TARANSACTION_HISTORY_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_CURRENTBALANCE_INITIATED:
      return {
        ...state,
        error: false,
        loading: true,
        message: false,
      };
    case actions.GET_CURRENTBALANCE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        currBal: action.payload.data,
      };
    case actions.GET_CURRENTBALANCE_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_WALLET_DATA_ID_INITIATED:
      return {
        ...state,
        error: false,
        loading: true,
        message: false,
      };
    case actions.GET_WALLET_DATA_ID_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        walletData: action.payload.data,
      };
    case actions.GET_WALLET_DATA_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.SAVE_WITHDRAW_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isAdded: false,
        loading: true,
      };
    case actions.SAVE_WITHDRAW_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.SAVE_WITHDRAW_ERROR:
      return {
        ...state,
        error: true,
        isAdded: false,
        loading: false,
        message: action.error,
      };
    case actions.GET_WITHDRAW_LIST_INITIATED:
      return {
        ...state,
        error: false,
        loading: true,
        message: false,
      };
    case actions.GET_WITHDRAW_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        withdrawList: action.payload.data,
      };
    case actions.GET_WITHDRAW_LIST_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_WITHDRAW_REQUEST_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_WITHDRAW_REQUEST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_WITHDRAW_REQUEST_ERROR:
      return {
        ...state,
        error: true,
        isDeleted: false,
        loading: false,
        message: action.error,
      };
    case actions.GET_PARTNER_TRANSACTION_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_PARTNER_TRANSACTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        PartTransaction: action.payload.data,
      };
    case actions.GET_PARTNER_TRANSACTION_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_WITHDRAW_REQUESTS_INITIATED:
      return {
        ...state,
        error: false,
        loading: true,
        message: false,
      };
    case actions.GET_WITHDRAW_REQUESTS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        withdrawRequests: action.payload.data,
      };
    case actions.GET_WITHDRAW_REQUESTS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.SAVE_WITHDRAW_REQUESTS_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isAdded: false,
        loading: true,
      };
    case actions.SAVE_WITHDRAW_REQUESTS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isAdded: true,
      };
    case actions.SAVE_WITHDRAW_REQUESTS_ERROR:
      return {
        ...state,
        error: true,
        isAdded: false,
        loading: false,
        message: action.error,
      };
    default:
      return state;
  }
};
