import { push } from "connected-react-router";
import { message, notification } from "antd";

import { axiosGet ,axiosPost } from "modules/Axios";
import { loader } from "redux/app/actions";
import { apiConstant } from "modules/config";
import * as actions from "./constant";

export const login = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGIN_INITIATED });
    emptyCache();
    let url =
      payload.role !== "partner"
        ? apiConstant.AUTH_LOGIN
        : apiConstant.PARTNER_LOGIN;
    let response = await axiosPost(
      url , {userName:payload.userName,password:payload.password}
    );
    if (response.responseStatus === "1") {
      let data = {
        emailId: payload.userName,
        userId: response.userid,
        token: response.token,
        role: payload.role,
        userName: response.name,
        date: response.createDate,
        prj: "nblPartner",
      };
      localStorage.setItem("auth", JSON.stringify(data));
      let msg = "Login as " + payload.role;
      if (window.innerWidth > 1000) {
        notification["success"]({
          message: "User Authorized",
          description: msg,
        });
      } else message.success(msg);
      window.location.reload();
      await dispatch({ type: actions.LOGIN_SUCCESS, payload: response });
      dispatch(push("/"));
    } else dispatch({ type: actions.LOGIN_ERROR, error: response.message });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.LOGIN_ERROR, error: "Network Error" });
  }
};
export const setAuth = (payload) => (dispatch) => {
  dispatch({ type: actions.SET_AUTH, payload });
};
export const setAuthUser = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SET_AUTH_INITIATED });
    let response = await axiosGet(payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.SET_AUTH_SUCCESS, payload: response });
    } else {
      dispatch({ type: actions.SET_AUTH_ERROR, error: response });
      dispatch(logout());
    }
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SET_AUTH_ERROR, error: "Network Error" });
  }
};
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: actions.LOGOUT_INITIATED });
    dispatch(loader(true));
    localStorage.removeItem("auth");
    emptyCache();
    dispatch({ type: actions.LOGOUT });
    dispatch(loader(false));
    setTimeout(() => {
      window.location.reload();
    }, 200);
  } catch (error) {
    dispatch(loader(false));
    console.log(error, "Logout Error");
  }
};
export const forgetPassword = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.FORGET_PASSWORD_INITIATED });
    let url =
      payload.role !== "partner"
        ? apiConstant.FORGET_PASSWORD
        : apiConstant.FORGET_PARTNER_PASSWORD;
    let response = await axiosPost(url + payload.email);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.FORGET_PASSWORD_SUCCESS,
        payload: response,
      });
      dispatch(
        push(
          payload.role === "admin"
            ? "/login/admin"
            : payload.role === "user"
            ? "/login/user"
            : "/login"
        )
      );
    } else dispatch({ type: actions.FORGET_PASSWORD_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.FORGET_PASSWORD_ERROR, error: "Network Error" });
  }
};
export const emptyCache = () => {
  if ("caches" in window)
    caches.keys().then((a) => {
      a?.forEach((b) => {
        caches.delete(b);
      });
    });
};
