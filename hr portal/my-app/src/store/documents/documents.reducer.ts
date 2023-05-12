import {
  GET_DOCUMENTS_ERROR,
  GET_DOCUMENTS_LOADING,
  GET_DOCUMENTS_SUCCESS,
} from "./documents.types";

type intialState = {
  loading: Boolean;
  error: Boolean;
  data: [];
};

const inital: intialState = {
  loading: false,
  error: false,
  data: [],
};

export const documentReducer = (state = inital, { type, payload }: any) => {
  switch (type) {
    case GET_DOCUMENTS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_DOCUMENTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_DOCUMENTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: false,
        data: payload,
      };
    }
    default:
      return state;
  }
};
