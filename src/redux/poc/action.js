import { message } from "antd";
import * as actions from "./constant";
import { pocConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";

export const savePoc = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_POC_INITIATED });
    let response = await axiosAuthPost(pocConst.SAVE_POC, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_POC_SUCCESS, payload: response });
    } else dispatch({ type: actions.SAVE_POC_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.SAVE_POC_ERROR, error: "Network Error" });
  }
};
export const getPoc = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_POC_INITIATED });
    let response = await axiosAuthGet(pocConst.GET_POC);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_POC_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_POC_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_POC_ERROR, error: "Network Error" });
  }
};
export const deletePoc = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_POC_INITIATED });
    let response = await axiosAuthPost(pocConst.DELETE_POC + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.DELETE_POC_SUCCESS, payload: response });
    } else dispatch({ type: actions.DELETE_POC_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.DELETE_POC_ERROR, error: "Network Error" });
  }
};
