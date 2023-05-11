import axios from "axios";
import {
  GET_SINGLEUSER_ERROR,
  GET_SINGLEUSER_LOADING,
  GET_SINGLEUSER_SUCCESS,
} from "./singleUser.types";
import { getUsers } from "../users/users.action";

export const getSingleUsers = (id: any) => async (dispatch: any) => {
  dispatch({ type: GET_SINGLEUSER_LOADING });
  try {
    let res = await axios.get(`http://localhost:8080/users/${+id}`);
    dispatch({ type: GET_SINGLEUSER_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: GET_SINGLEUSER_ERROR });
    console.log(e);
  }
};

export const deleteUser = (id: any) => async (dispatch: any) => {
  try {
    let res = await axios.delete(`http://localhost:8080/users/${+id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
