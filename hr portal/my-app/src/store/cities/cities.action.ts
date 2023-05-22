import axios from "axios";
import {
  GET_CITIES_ERROR,
  GET_CITIES_LOADING,
  GET_CITIES_SUCCESS,
} from "./cities.types";

export const getCities = () => async (dispatch: any) => {
  dispatch({ type: GET_CITIES_LOADING });
  try {
    let res = await axios.get(`http://localhost:8080/city`);
    dispatch({ type: GET_CITIES_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_CITIES_ERROR });
    console.log(error);
  }
};
