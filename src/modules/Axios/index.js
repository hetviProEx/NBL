import axios from "axios";
import store from "redux/store";
import { configVar } from "modules/config";
import { errorHandler, errorEmpty } from "redux/app/actions";
import { logout } from "redux/login/actions";

const token = localStorage.auth ? JSON.parse(localStorage.auth).token : "";
const config = { headers: { Authorization: `Bearer ${token}` } };

export const axiosGet = async (url) => {
  try {
    url = url.replace(/[^\x00-\x7F]/g, "");
    let { data: response } = await axios.get(configVar.BASE_URL + url);
    if (response.responseStatus !== "1")
      store.dispatch(errorHandler(response.message));
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    store.dispatch(errorHandler());
    console.log(error);
  }
};
export const axiosPost = async (url, payload) => {
  try {
    url = url.replace(/[^\x00-\x7F]/g, "");
    let { data: response } = await axios.post(
      configVar.BASE_URL + url,
      payload
    );
    if (response.responseStatus !== "1")
      store.dispatch(errorHandler(response.message));
    store.dispatch(errorEmpty());
    return response;
  } catch (error) {
    store.dispatch(errorHandler());
    console.log(error);
  }
};
export const axiosAuthGet = async (url) => {
  try {
    if (token) {
      url = url.replace(/[^\x00-\x7F]/g, "");
      let { data: response } = await axios.get(
        configVar.BASE_URL + url,
        config
      );
      if (response.responseStatus !== "1")
        store.dispatch(errorHandler(response.message));
      store.dispatch(errorEmpty());
      return response;
    }
  } catch (error) {
    console.log(error);
    logError(error);
  }
};
export const axiosAuthPost = async (url, payload) => {
  try {
    if (token) {
      url = url.replace(/[^\x00-\x7F]/g, "");
      let { data: response } = await axios.post(
        configVar.BASE_URL + url,
        payload,
        config
      );
      if (response.responseStatus !== "1")
        store.dispatch(errorHandler(response.message));
      store.dispatch(errorEmpty());
      return response;
    }
  } catch (error) {
    console.log(error);
    logError(error);
  }
};
const logError = (err) => {
  let error = JSON.stringify(err);
  let msg = "Request failed with status code 401";
  if (error.match(msg)) {
    store.dispatch(logout());
  }
};
