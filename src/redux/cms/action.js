import { message } from "antd";
import * as actions from "./constant";
import { cmsConst } from "modules/config";
import { axiosAuthPost, axiosAuthGet, axiosGet } from "modules/Axios";

export const saveLoginImage = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_LOGINIMAGE_INITIATED });
    let response = await axiosAuthPost(cmsConst.SAVE_LOGINIMAGE, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_LOGINIMAGE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_LOGINIMAGE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_LOGINIMAGE_ERROR,
      error: "Network Error",
    });
  }
};
export const getLoginImages = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_LOGINIMAGES_INITIATED });
    let response = await axiosGet(cmsConst.GET_LOGINIMAGES);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_LOGINIMAGES_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_LOGINIMAGES_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_LOGINIMAGES_ERROR, error: "Network Error" });
  }
};
export const deleteLoginImages = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_LOGINIMAGES_INITIATED });
    let response = await axiosAuthPost(cmsConst.DELETE_LOGINIMAGES + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_LOGINIMAGES_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.DELETE_LOGINIMAGES_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_LOGINIMAGES_ERROR,
      error: "Network Error",
    });
  }
};
export const saveTestimonial = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_TESTIMONIAL_INITIATED });
    let response = await axiosAuthPost(cmsConst.SAVE_TESTIMONIAL, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_TESTIMONIAL_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.SAVE_TESTIMONIAL_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.SAVE_TESTIMONIAL_ERROR, error: "Network Error" });
  }
};
export const deleteTestimonial = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_TESTIMONIAL_INITIATED });
    let response = await axiosAuthPost(cmsConst.DELETE_TESTIMONIAL + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_TESTIMONIAL_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.DELETE_TESTIMONIAL_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_TESTIMONIAL_ERROR,
      error: "Network Error",
    });
  }
};
export const getTestimonial = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_TESTIMONIAL_INITIATED });
    let response = await axiosAuthPost(cmsConst.GET_TESTIMONIAL, payload);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_TESTIMONIAL_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_TESTIMONIAL_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.GET_TESTIMONIAL_ERROR, error: "Network Error" });
  }
};
export const getTestimonialById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_TESTIMONIAL_BY_ID_INITIATED });
    let response = await axiosAuthPost(cmsConst.GET_TESTIMONIAL_BY_ID + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_TESTIMONIAL_BY_ID_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.GET_TESTIMONIAL_BY_ID_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.GET_TESTIMONIAL_BY_ID_ERROR,
      error: "Network Error",
    });
  }
};
export const saveOffers = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_OFFERS_INITIATED });
    let response = await axiosAuthPost(cmsConst.SAVE_OFFERS, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({ type: actions.SAVE_OFFERS_SUCCESS, payload: response });
    } else dispatch({ type: actions.SAVE_OFFERS_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_OFFERS_ERROR,
      error: "Network Error",
    });
  }
};
export const getOfferList = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_OFFERLIST_INITIATED });
    let response = await axiosAuthGet(cmsConst.GET_OFFERLIST);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_OFFERLIST_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_OFFERLIST_ERROR, error: response });
  } catch (error) {
    console.log(error);
    dispatch({ type: actions.GET_OFFERLIST_ERROR, error: "Network Error" });
  }
};
export const getOfferById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.GET_OFFER_BY_ID_INITIATED });
    let response = await axiosAuthPost(cmsConst.GET_OFFER_BY_ID + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.GET_OFFER_BY_ID_SUCCESS,
        payload: response,
      });
    } else dispatch({ type: actions.GET_OFFER_BY_ID_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({ type: actions.GET_OFFER_BY_ID_ERROR, error: "Network Error" });
  }
};
export const deleteOffer = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_OFFER_BY_ID_INITIATED });
    let response = await axiosAuthPost(cmsConst.DELETE_OFFER + id);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.DELETE_OFFER_BY_ID_SUCCESS,
        payload: response,
      });
    } else
      dispatch({ type: actions.DELETE_OFFER_BY_ID_ERROR, error: response });
  } catch (error) {
    console.log(error, "action catch");
    dispatch({
      type: actions.DELETE_OFFER_BY_ID_ERROR,
      error: "Network Error",
    });
  }
};
export const saveCategory = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_CATEGORY_SUCCESS });
    let response = await axiosAuthPost(cmsConst.SAVE_CATEGORY, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_CATEGORY_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_CATEGORY_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_CATEGORY_ERROR,
      error: "Network Error",
    });
  }
};
export const categoryList = () => async (dispatch) => {
  try {
    dispatch({ type: actions.CATEGORY_LIST_INITIATED });
    let response = await axiosAuthGet(cmsConst.CATEGORY_LIST);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.CATEGORY_LIST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.CATEGORY_LIST_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.CATEGORY_LIST_ERROR,
      error: "Network Error",
    });
  }
};

export const saveKnowledge = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.SAVE_KNOWLEDGE_INITIATED });
    let response = await axiosAuthPost(cmsConst.SAVE_KNOWLEDGE, payload);
    if (response.responseStatus === "1") {
      message.success(response.message);
      await dispatch({
        type: actions.SAVE_KNOWLEDGE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.SAVE_KNOWLEDGE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.SAVE_KNOWLEDGE_ERROR,
      error: "Network Error",
    });
  }
};
export const knowledgeList = (payload) => async (dispatch) => {
  try {
    dispatch({ type: actions.KNOWLEDGE_LIST_INITIATED });
    let response = await axiosAuthPost(cmsConst.KNOWLEDGE_LIST, payload);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.KNOWLEDGE_LIST_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.KNOWLEDGE_LIST_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.KNOWLEDGE_LIST_ERROR,
      error: "Network Error",
    });
  }
};

export const knowledgeById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.KNOWLEDGE_BY_ID_INITIATED });
    let response = await axiosAuthPost(cmsConst.KNOWLEDGE_BY_ID + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.KNOWLEDGE_BY_ID_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.KNOWLEDGE_BY_ID_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.KNOWLEDGE_BY_ID_ERROR,
      error: "Network Error",
    });
  }
};
export const deleteknowledge = (id) => async (dispatch) => {
  try {
    dispatch({ type: actions.DELETE_KNOWLEDGE_INITIATED });
    let response = await axiosAuthPost(cmsConst.DELETE_KNOWLEDGE + id);
    if (response.responseStatus === "1") {
      await dispatch({
        type: actions.DELETE_KNOWLEDGE_SUCCESS,
        payload: response,
      });
    } else {
      dispatch({
        type: actions.DELETE_KNOWLEDGE_ERROR,
        error: response,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: actions.DELETE_KNOWLEDGE_ERROR,
      error: "Network Error",
    });
  }
};
