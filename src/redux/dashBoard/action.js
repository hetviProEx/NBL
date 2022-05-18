import { dashBoardConst } from "modules/config";
import { axiosAuthPost } from "modules/Axios";
import * as actions from "./constant";

export const getDashBoard = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_DASHBOARD_INITIATED });
    let response = await axiosAuthPost(dashBoardConst.GET_DASHBOARD + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_DASHBOARD_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_DASHBOARD_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_DASHBOARD_ERROR, error: "Network Error" });
  }
};
