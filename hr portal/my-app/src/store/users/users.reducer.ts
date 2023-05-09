import {
  GET_USERS_ERROR,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
} from "./users.types";

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

export const userReducer = (state = inital, { type, payload }: any) => {
  switch (type) {
    case GET_USERS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_USERS_SUCCESS: {
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
