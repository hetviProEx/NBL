import { message } from "antd";
import * as actions from "./constant";
import { commissionConst } from "modules/config";
import { axiosAuthPost } from "modules/Axios";

export const saveCommission = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_COMMISSION_INITIATED });
    let response = await axiosAuthPost(
      commissionConst.SAVE_COMMISSION,
      payload
    );
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_COMMISSION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_COMMISSION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_COMMISSION_ERROR,
      error: "Network Error",
    });
  }
};
export const getCommission = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_COMMISSION_INITIATED });
    let response = await axiosAuthPost(commissionConst.GET_COMMISSION, payload);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_COMMISSION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_COMMISSION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_COMMISSION_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteCommission = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_COMMISSION_INITIATED });
    let response = await axiosAuthPost(commissionConst.DELETE_COMMISSION + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_COMMISSION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_COMMISSION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_COMMISSION_ERROR,
      error: "Network Error",
    });
  }
};
export const saveCommissionManage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_COMMISSION_MANAGE_INITIATED });
    let response = await axiosAuthPost(
      commissionConst.SAVE_COMMISSION_MANAGE,
      payload
    );
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_COMMISSION_MANAGE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_COMMISSION_MANAGE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_COMMISSION_MANAGE_ERROR,
      error: "Network Error",
    });
  }
};
export const getCommissionManage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_COMMISSION_MANAGE_INITIATED });
    let response = await axiosAuthPost(
      commissionConst.GET_COMMISSION_MANAGE,
      payload
    );
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_COMMISSION_MANAGE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_COMMISSION_MANAGE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_COMMISSION_MANAGE_ERROR,
      error: "Network Error",
    });
  }
};
export const getCommissionById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_COMMISSION_BY_ID_INITIATED });
    let response = await axiosAuthPost(
      commissionConst.GET_COMMISSION_BY_ID + id
    );
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_COMMISSION_BY_ID_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_COMMISSION_BY_ID_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_COMMISSION_BY_ID_ERROR,
      error: "Network Error",
    });
  }
};
