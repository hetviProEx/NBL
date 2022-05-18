import * as actions from "./constant";

const initialState = {
  error: false,
  loading: false,
  message: false,
  isSaved: false,
  isDeleted: false,
  loginImages: [],
  testimonial: {},
  testimonials: [],
  offerList: [],
  offer: {},
  categoryList: [],
  knowledgeList: [],
  knowledge: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SAVE_LOGINIMAGE_INITIATED:
      return {
        ...state,
        isSaved: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_LOGINIMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSaved: true,
      };
    case actions.SAVE_LOGINIMAGE_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.GET_LOGINIMAGES_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_LOGINIMAGES_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        loginImages: action.payload.data,
      };
    case actions.GET_LOGINIMAGES_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_LOGINIMAGES_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_LOGINIMAGES_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_LOGINIMAGES_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.SAVE_TESTIMONIAL_INITIATED:
      return {
        ...state,
        isSaved: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSaved: true,
      };
    case actions.SAVE_TESTIMONIAL_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.DELETE_TESTIMONIAL_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_TESTIMONIAL_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.GET_TESTIMONIAL_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_TESTIMONIAL_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        testimonials: action.payload.data,
      };
    case actions.GET_TESTIMONIAL_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_TESTIMONIAL_BY_ID_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_TESTIMONIAL_BY_ID_SUCCESS: {
      return {
        ...state,
        error: false,
        message: false,
        loading: false,
        testimonial: action.payload.data,
      };
    }
    case actions.GET_TESTIMONIAL_BY_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.SAVE_OFFERS_INITIATED:
      return {
        ...state,
        isSaved: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_OFFERS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSaved: true,
      };
    case actions.SAVE_OFFERS_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.GET_OFFERLIST_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_OFFERLIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        offerList: action.payload.data,
      };
    case actions.GET_OFFERLIST_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.GET_OFFER_BY_ID_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.GET_OFFER_BY_ID_SUCCESS: {
      return {
        ...state,
        error: false,
        message: false,
        loading: false,
        offer: action.payload.data,
      };
    }
    case actions.GET_OFFER_BY_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_OFFER_BY_ID_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_OFFER_BY_ID_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_OFFER_BY_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    case actions.SAVE_CATEGORY_INITIATED:
      return {
        ...state,
        isSaved: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_CATEGORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSaved: true,
      };
    case actions.SAVE_CATEGORY_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.CATEGORY_LIST_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        categoryList: action.payload.data,
      };
    case actions.CATEGORY_LIST_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.SAVE_KNOWLEDGE_INITIATED:
      return {
        ...state,
        isSaved: false,
        message: false,
        error: false,
        loading: true,
      };
    case actions.SAVE_KNOWLEDGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        isSaved: true,
      };
    case actions.SAVE_KNOWLEDGE_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isSaved: false,
        message: action.error,
      };
    case actions.KNOWLEDGE_LIST_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.KNOWLEDGE_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        knowledgeList: action.payload.data,
      };
    case actions.KNOWLEDGE_LIST_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.KNOWLEDGE_BY_ID_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        loading: true,
      };
    case actions.KNOWLEDGE_BY_ID_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        knowledge: action.payload.data,
      };
    case actions.KNOWLEDGE_BY_ID_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        message: action.error,
      };
    case actions.DELETE_KNOWLEDGE_INITIATED:
      return {
        ...state,
        error: false,
        message: false,
        isDeleted: false,
        loading: true,
      };
    case actions.DELETE_KNOWLEDGE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        isDeleted: true,
      };
    case actions.DELETE_KNOWLEDGE_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        isDeleted: false,
        message: action.error,
      };
    default:
      return state;
  }
};
