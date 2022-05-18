import { message } from "antd";
import * as actions from "./constant";
import { mediaConst } from "modules/config";
import { axiosAuthPost } from "modules/Axios";

export const SaveMedia = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_MEDIA_INITIATED });
    let response = await axiosAuthPost(mediaConst.SAVE_MEDIA, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_MEDIA_SUCCESS, payload: response });
    } else dispatch({ type: actions.SAVE_MEDIA_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SAVE_MEDIA_ERROR, error: "Network Error" });
  }
};
export const getMedia = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_MEDIA_INITIATED });
    let response = await axiosAuthPost(mediaConst.GET_MEDIA);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_MEDIA_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_MEDIA_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.GET_MEDIA_ERROR, error: "Network Error" });
  }
};

export const deleteMedia = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_MEDIA_INITIATED });
    let response = await axiosAuthPost(mediaConst.DELETE_MEDIA + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.DELETE_MEDIA_SUCCESS, payload: response });
    } else dispatch({ type: actions.DELETE_MEDIA_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.DELETE_MEDIA_ERROR, error: "Network Error" });
  }
};
