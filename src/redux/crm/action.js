import { message } from "antd";
import { push } from "connected-react-router";

import { crmConst, configVar } from "modules/config";
import { axiosAuthPost, axiosAuthGet } from "modules/Axios";
import * as actions from "./constant";

export const saveProspect = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_PROSPECT_INITIATED });
    let response = await axiosAuthPost(crmConst.SAVE_PROSPECT, payload.data);
    if (response.responseStatus === "1") {
      if (payload.msg) {
        message.success(response.message);
        await dispatch({
          type: actions.SAVE_PROSPECT_SUCCESS,
          payload: response,
        });
      }
    } else dispatch({ type: actions.SAVE_PROSPECT_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_PROSPECT_ERROR,
      error: "Network Error",
    });
  }
};
export const getProspect = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PROSPECT_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_PROSPECT, payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_PROSPECT_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_PROSPECT_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_PROSPECT_ERROR, error: "Network Error" });
  }
};
export const deleteProspect = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_PROSPECT_INITIATED });
    let response = await axiosAuthPost(crmConst.DELETE_PROSPECT + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_PROSPECT_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.DELETE_PROSPECT_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.DELETE_PROSPECT_ERROR, error: "Network Error" });
  }
};
export const getCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_CUSTOMER_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_CUSTOMER + id);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_CUSTOMER_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_CUSTOMER_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_CUSTOMER_ERROR, error: "Network Error" });
  }
};
export const getleadType = () => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LEAD_TYPE_INITIATED });
    let response = await axiosAuthGet(crmConst.GET_LEAD_TYPE);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_LEAD_TYPE_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_LEAD_TYPE_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_LEAD_TYPE_ERROR, error: "Network Error" });
  }
};
export const getProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_INITIATED });
    let response = await axiosAuthGet(crmConst.GET_PRODUCT, payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_PRODUCT_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_PRODUCT_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_PRODUCT_ERROR, error: "Network Error" });
  }
};
export const saveLeads = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_LEADS_INITIATED });
    let response = await axiosAuthPost(crmConst.SAVE_LEADS, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_LEADS_SUCCESS, payload: response });
    } else dispatch({ type: actions.SAVE_LEADS_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.SAVE_LEADS_ERROR, error: "Network Error" });
  }
};
export const getLeads = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LEADS_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_LEADS, payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_LEADS_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_LEADS_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_LEADS_ERROR, error: "Network Error" });
  }
};
export const deleteLead = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_LEAD_INITIATED });
    let response = await axiosAuthPost(crmConst.DELETE_LEAD + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.DELETE_LEAD_SUCCESS, payload: response });
    } else dispatch({ type: actions.DELETE_LEAD_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.DELETE_LEAD_ERROR, error: "Network Error" });
  }
};
export const getProductByCustomer = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_BY_CUSTOMER_INITIATED });
    let response = await axiosAuthPost(
      crmConst.GET_PRODUCT_BY_CUSTOMER,
      payload
    );
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PRODUCT_BY_CUSTOMER_SUCCESS,
        payload: response,
      });
    } else
      dispatch({
        type: actions.GET_PRODUCT_BY_CUSTOMER_ERROR,
        error: response,
      });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PRODUCT_BY_CUSTOMER_ERROR,
      error: "Network Error",
    });
  }
};
export const saveDemo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_DEMO_INITIATED });
    let response = await axiosAuthPost(crmConst.SAVE_DEMO, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_DEMO_SUCCESS, payload: response });
    } else dispatch({ type: actions.SAVE_DEMO_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.SAVE_DEMO_ERROR, error: "Network Error" });
  }
};
export const getDemo = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_DEMO_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_DEMO, payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_DEMO_SUCCESS, payload: response });
    } else {
      dispatch({ type: actions.GET_DEMO_ERROR, error: response });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_DEMO_ERROR, error: "Network Error" });
  }
};
export const deleteDemo = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_DEMO_INITIATED });
    let response = await axiosAuthPost(crmConst.DELETE_DEMO + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.DELETE_DEMO_SUCCESS, payload: response });
    } else dispatch({ type: actions.DELETE_DEMO_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.DELETE_DEMO_ERROR, error: "Network Error" });
  }
};
export const getPartnerProduct = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PARTNER_PRODUCT_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_PARTNER_PRODUCT, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.GET_PARTNER_PRODUCT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PARTNER_PRODUCT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PARTNER_PRODUCT_ERROR,
      error: "Network Error",
    });
  }
};
export const getProdSubscript = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_PRODUCT_SUBSCRIPTION_INITIATED });
    let response = await axiosAuthPost(
      crmConst.GET_PRODUCT_SUBSCRIPTION + payload,
      payload
    );
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_PRODUCT_SUBSCRIPTION_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_PRODUCT_SUBSCRIPTION_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_PRODUCT_SUBSCRIPTION_ERROR,
      error: "Network Error",
    });
  }
};
export const getLeadCustomer = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LEAD_CUSTOMER_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_LEAD_CUSTOMER + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_LEAD_CUSTOMER_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.GET_LEAD_CUSTOMER_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_LEAD_CUSTOMER_ERROR, error: "Network Error" });
  }
};
export const saveSales = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_SALES_INITIATED });
    let response = await axiosAuthPost(crmConst.SAVE_SALES, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_SALES_SUCCESS, payload: response });
      dispatch(push("/sales"));
    } else dispatch({ type: actions.SAVE_SALES_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_SALES_ERROR,
      error: "Network Error",
    });
  }
};
export const getSales = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_SALES_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_SALES, payload);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_SALES_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_SALES_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_SALES_ERROR,
      error: "Network Error",
    });
  }
};
export const getSalesById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_SALES_BY_ID_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_SALES_BY_ID+id);
    if (response.responseStatus === "1") {
      await dispatch({ type: actions.GET_SALES_BY_ID_SUCCESS, payload: response });
    } else dispatch({ type: actions.GET_SALES_BY_ID_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_SALES_BY_ID_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteSales = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_SALES_INITIATED });
    let response = await axiosAuthPost(crmConst.DELETE_SALES+id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.DELETE_SALES_SUCCESS, payload: response });
    } else dispatch({ type: actions.DELETE_SALES_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_SALES_ERROR,
      error: "Network Error",
    });
  }
};

export const getSalesDashboard = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_SALES_DASHBOARD_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_SALES_DASHBOARD + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_SALES_DASHBOARD_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.GET_SALES_DASHBOARD_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_SALES_DASHBOARD_ERROR,
      error: "Network Error",
    });
  }
};

export const importProspect = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.IMPORT_PROSPECT_INITIATED });
    let response = await axiosAuthPost(crmConst.IMPORT_PROSPECT, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      let url = response.data.file
        ? configVar.BASE_URL.slice("/", -1) +
          response.data.file.replace(/[^\x00-\x7F]/g, "")
        : "";
      response.data.file && window.open(url, "_blank");
      response.data.message && message.error(response.data.message);
      await dispatch({
        type: actions.IMPORT_PROSPECT_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.IMPORT_PROSPECT_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.IMPORT_PROSPECT_ERROR,
      error: "Network Error",
    });
  }
};
export const getLeadsMeeting = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LEADS_MEETING_INITIATED });
    let response = await axiosAuthPost(crmConst.GET_LEADS_MEETING + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_LEADS_MEETING_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_LEADS_MEETING_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.GET_LEADS_MEETING_ERROR,
      error: "Network Error",
    });
  }
};
