import { message } from "antd";
import { push } from "connected-react-router";

import { subscribeConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const getSubscribePackage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PACKAGE_INITIATED });
    let response = await axiosAuthGet(subscribeConst.PACKAGE, payload);
    if (response) {
      await dispatch({ type: actions.GET_PACKAGE_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_PACKAGE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.GET_PACKAGE_ERROR, error: "Network Error" });
  }
};
export const saveProductPackage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_PRODUCT_PACKAGE_INITIATED });
    let response = await axiosAuthPost(
      subscribeConst.SAVE_PRODUCT_PACKAGE,
      payload.data
    );
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_PRODUCT_PACKAGE_SUCCESS,
        payload: response,
      });
      if (!payload.saveOther)dispatch(push("/package-list/" + payload.url));
    } else
      dispatch({ type: actions.SAVE_PRODUCT_PACKAGE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.SAVE_PRODUCT_PACKAGE_ERROR,
      error: "Network Error",
    });
  }
};
export const getProductPackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_PACKAGE_INITIATED });
    let response = await axiosAuthPost(subscribeConst.GET_PRODUCT_PACKAGE + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_PRODUCT_PACKAGE_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.GET_PRODUCT_PACKAGE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PRODUCT_PACKAGE_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteProductPackage = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_PRODUCT_PACKAGE_INITIATED });
    let response = await axiosAuthPost(
      subscribeConst.DELETE_PRODUCT_PACKAGE + id
    );
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_PRODUCT_PACKAGE_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.DELETE_PRODUCT_PACKAGE_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_PRODUCT_PACKAGE_ERROR,
      error: "Network Error",
    });
  }
};
export const getPackageById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PACKAGE_BY_ID_INITIATED });
    let response = await axiosAuthPost(subscribeConst.GET_PACKAGE_BY_ID + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_PACKAGE_BY_ID_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_PACKAGE_BY_ID_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_PACKAGE_BY_ID_ERROR,
      error: "Network Error",
    });
  }
};
