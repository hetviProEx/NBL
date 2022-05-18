import { message } from "antd";
import { push } from "connected-react-router";
import { userConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const getUserRights = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_USER_RIGHTS_INITIATED });
    let response = await axiosAuthGet(userConst.GET_USER_RIGHTS, payload);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_USER_RIGHTS_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_USER_RIGHTS_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_USER_RIGHTS_ERROR,
      error: "Network Error",
    });
  }
};
export const saveUser = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_USER_INITIATED });
    let response = await axiosAuthPost(userConst.SAVE_USER, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_USER_SUCCESS,
        payload: response,
      });
      dispatch(push("/users"));
    } else {
      dispatch({
        type: actions.SAVE_USER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_USER_ERROR,
      error: "Network Error",
    });
  }
};

export const getUsers = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_USERS_INITIATED });
    let response = await axiosAuthPost(userConst.GET_USERS, payload);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_USERS_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_USERS_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_USERS_ERROR,
      error: "Network Error",
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_USER_INITIATED });
    let response = await axiosAuthPost(userConst.DELETE_USER + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_USER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_USER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_USER_ERROR,
      error: "Network Error",
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_USER_BY_ID_INITIATED });
    let response = await axiosAuthPost(userConst.GET_USER_BY_ID + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_USER_BY_ID_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_USER_BY_ID_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_USER_BY_ID_ERROR,
      error: "Network Error",
    });
  }
};
