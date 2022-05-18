import { message } from "antd";
import { push } from "connected-react-router";
import { partnerUsersConst } from "modules/config";
import { axiosAuthPost } from "modules/Axios";
import * as actions from "./constant";

export const saveContactus = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_CONTACTUS_INITIATED });
    let response = await axiosAuthPost(
      partnerUsersConst.SAVE_CONTACTUS,
      payload
    );
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_CONTACTUS_SUCCESS,
        payload: response,
      });
      dispatch(push("/dashboard"));
    } else dispatch({ type: actions.SAVE_CONTACTUS_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SAVE_CONTACTUS_ERROR, error: "Network Error" });
  }
};
export const saveSupport = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_SUPPORT_INITIATED });
    let response = await axiosAuthPost(partnerUsersConst.SAVE_SUPPORT, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_SUPPORT_SUCCESS, payload: response });
      dispatch(push("/dashboard"));
    } else dispatch({ type: actions.SAVE_SUPPORT_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SAVE_SUPPORT_ERROR, error: "Network Error" });
  }
};
