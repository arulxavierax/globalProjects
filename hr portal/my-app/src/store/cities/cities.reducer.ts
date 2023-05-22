import {
  GET_CITIES_ERROR,
  GET_CITIES_LOADING,
  GET_CITIES_SUCCESS,
} from "./cities.types";

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

export const citiesReducer = (state = inital, { type, payload }: any) => {
  switch (type) {
    case GET_CITIES_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case GET_CITIES_ERROR: {
      return {
        ...state,
        loading: false,
        error: true,
      };
    }
    case GET_CITIES_SUCCESS: {
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
