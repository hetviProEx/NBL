import { message } from "antd";
import { push } from "connected-react-router";

import { productConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const saveProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_PRODUCT_INITIATED });
    let response = await axiosAuthPost(productConst.SAVE_PRODUCT, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_PRODUCT_SUCCESS, payload: response });
      dispatch(push("/products"));
    } else dispatch({ type: actions.SAVE_PRODUCT_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SAVE_PRODUCT_ERROR, error: "Network Error" });
  }
};
export const getProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_INITIATED });
    let url = payload
      ? productConst.GET_PRODUCT + "?Id=" + payload
      : productConst.GET_PRODUCT;
    let response = await axiosAuthGet(url, payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_PRODUCT_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_PRODUCT_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.GET_PRODUCT_ERROR, error: "Network Error" });
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_PRODUCT_INITIATED });
    let response = await axiosAuthPost(productConst.DELETE_PRODUCT + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_PRODUCT_SUCCESS,
        payload: response,
      });
      window.location.reload();
    } else dispatch({ type: actions.DELETE_PRODUCT_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.DELETE_PRODUCT_ERROR, error: "Network Error" });
  }
};
