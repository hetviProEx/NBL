import { message } from "antd";
import * as actions from "./constant";
import { promoConst } from "modules/config";
import { axiosAuthPost } from "modules/Axios";

export const savePromo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_PROMOCODE_INITIATED });
    let response = await axiosAuthPost(promoConst.SAVE_PROMOCODE, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_PROMOCODE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_PROMOCODE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_PROMOCODE_ERROR,
      error: "Network Error",
    });
  }
};
export const getPromo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PROMO_INITIATED });
    let response = await axiosAuthPost(promoConst.GET_PROMO, payload);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_PROMO_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PROMO_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PROMO_ERROR,
      error: "Network Error",
    });
  }
};
export const deletePromo = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_PROMO_INITIATED });
    let response = await axiosAuthPost(promoConst.DELETE_PROMO + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.DELETE_PROMO_SUCCESS, payload: response });
    } else dispatch({ type: actions.DELETE_PROMO_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_PROMO_ERROR,
      error: "Network Error",
    });
  }
};
