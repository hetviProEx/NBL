import * as actions from "./constant";
import { push } from "connected-react-router";
// import isEmpty from "lodash.isempty";

export const errorHandler = (message) => (dispatch) => {
  try {
    // if (payload.ResponseStatus === "Unauthorized") {message = payload.message;localStorage.clear();} else
    let msg = "Network issue"; //isEmpty(message) ||
    msg = typeof message === "object" ? msg : message;
    dispatch({
      type: actions.ERROR_HANDLER,
      payload: msg,
    });
  } catch (error) {
    console.log(error, "Error Handler");
  }
};
export const redirectLogin = () => async (dispatch) => {
  localStorage.clear();
  sessionStorage.clear();
  await dispatch({ type: actions.REDIRECT_LOGIN });
  dispatch(push("/"));
};
export const errorEmpty = () => (dispatch) => {
  dispatch({ type: actions.ERROR_EMPTY });
};
export const loader = (payload) => (dispatch) => {
  dispatch({ type: actions.LOADER_STATUS, payload });
};
export const errorMessage = (payload) => (dispatch) => {
  dispatch({ type: actions.ERROR_HANDLER, payload });
};
  
