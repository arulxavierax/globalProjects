import {
  GET_SINGLEUSER_ERROR,
  GET_SINGLEUSER_LOADING,
  GET_SINGLEUSER_SUCCESS,
} from "./singleUser.types";

type intialState = {
  loading: Boolean;
  error: Boolean;
  data: {};
};

const inital: intialState = {
  loading: false,
  error: false,
  data: {},
};

export const singleReducer = (state = inital, { type, payload }: any) => {
  switch (type) {
    case GET_SINGLEUSER_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_SINGLEUSER_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_SINGLEUSER_SUCCESS: {
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
