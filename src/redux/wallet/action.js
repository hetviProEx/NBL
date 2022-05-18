import { message } from "antd";
import { WalletConst } from "modules/config";
import { axiosAuthPost } from "modules/Axios";
import * as actions from "./constant";

export const addWithdarawMoney = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.ADD_WITHDARAW_MONEY_INITIATED });
    let response = await axiosAuthPost(
      WalletConst.ADD_WITHDARAW_MONEY + payload
    );
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.ADD_WITHDARAW_MONEY_SUCCESS,
        payload: response,
      });
      window.location.reload();
    } else
      dispatch({ type: actions.ADD_WITHDARAW_MONEY_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.ADD_WITHDARAW_MONEY_ERROR,
      error: "Network Error",
    });
  }
};

export const getTaransactionHistory = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.TARANSACTION_HISTORY_INITIATED });
    let response = await axiosAuthPost(
      WalletConst.TARANSACTION_HISTORY,
      payload
    );
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.TARANSACTION_HISTORY_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.TARANSACTION_HISTORY_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.TARANSACTION_HISTORY_ERROR,
      error: "Network Error",
    });
  }
};
export const getCurrentBalance = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_CURRENTBALANCE_INITIATED });
    let response = await axiosAuthPost(WalletConst.CURRENTBALANCE + payload);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_CURRENTBALANCE_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.GET_CURRENTBALANCE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_CURRENTBALANCE_ERROR,
      error: "Network Error",
    });
  }
};
export const getWalletDataById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_WALLET_DATA_ID_INITIATED });
    let response = await axiosAuthPost(WalletConst.GET_WALLET_DATA_ID + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_WALLET_DATA_ID_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.GET_WALLET_DATA_ID_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_WALLET_DATA_ID_ERROR,
      error: "Network Error",
    });
  }
};
export const getPartnerTransaction = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PARTNER_TRANSACTION_INITIATED });
    let response = await axiosAuthPost(
      WalletConst.GET_PARTNER_TRANSACTION,
      payload
    );
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_PARTNER_TRANSACTION_SUCCESS,
        payload: response,
      });
    } else
      dispatch({
        type: actions.GET_PARTNER_TRANSACTION_ERROR,
        error: response,
      });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PARTNER_TRANSACTION_ERROR,
      error: "Network Error",
    });
  }
};
export const saveWithdraw = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_WITHDRAW_INITIATED });
    let response = await axiosAuthPost(WalletConst.SAVE_WITHDRAW, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_WITHDRAW_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.SAVE_WITHDRAW_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.SAVE_WITHDRAW_ERROR,
      error: "Network Error",
    });
  }
};
export const getWithdrawList = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_WITHDRAW_LIST_INITIATED });
    let response = await axiosAuthPost(WalletConst.GET_WITHDRAW_LIST, payload);
    if (response.responseStatus === "1") {
      // message.success(response.message);
      await dispatch({
        type: actions.GET_WITHDRAW_LIST_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_WITHDRAW_LIST_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_WITHDRAW_LIST_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteWithdrawRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_WITHDRAW_REQUEST_INITIATED });
    let response = await axiosAuthPost(
      WalletConst.DELETE_WITHDRAW_REQUEST + id
    );
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_WITHDRAW_REQUEST_SUCCESS,
        payload: response,
      });
    } else
      dispatch({
        type: actions.DELETE_WITHDRAW_REQUEST_ERROR,
        error: response,
      });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_WITHDRAW_REQUEST_ERROR,
      error: "Network Error",
    });
  }
};

export const getWithdrawRequest = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_WITHDRAW_REQUESTS_INITIATED });
    let response = await axiosAuthPost(
      WalletConst.GET_WITHDRAW_REQUESTS,
      payload
    );
    if (response.responseStatus === "1") {
      // message.success(response.message);
      await dispatch({
        type: actions.GET_WITHDRAW_REQUESTS_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.GET_WITHDRAW_REQUESTS_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_WITHDRAW_REQUESTS_ERROR,
      error: "Network Error",
    });
  }
};
export const saveWithdrawRequest = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_WITHDRAW_REQUESTS_INITIATED });
    let response = await axiosAuthPost(
      WalletConst.SAVE_WITHDRAW_REQUESTS,
      payload
    );
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_WITHDRAW_REQUESTS_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.SAVE_WITHDRAW_REQUESTS_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.SAVE_WITHDRAW_REQUESTS_ERROR,
      error: "Network Error",
    });
  }
};
