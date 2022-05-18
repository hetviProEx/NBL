import { message } from "antd";

import * as actions from "./constant";
import { crmConst } from "modules/config";
import { axiosAuthPost } from "modules/Axios";

export const setProspect = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_PROSPECT_INITIATED });
    let response = await axiosAuthPost(crmConst.SET_PROSPECT + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SET_PROSPECT_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.SET_PROSPECT_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SET_PROSPECT_ERROR, error: "Network Error" });
  }
};

export const setLead = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_LEAD_INITIATED });
    let response = await axiosAuthPost(crmConst.SET_LEAD + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SET_LEAD_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.SET_LEAD_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SET_LEAD_ERROR, error: "Network Error" });
  }
};

export const setDemo = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_DEMO_INITIATED });
    let response = await axiosAuthPost(crmConst.SET_DEMO + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SET_DEMO_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.SET_DEMO_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SET_DEMO_ERROR, error: "Network Error" });
  }
};
