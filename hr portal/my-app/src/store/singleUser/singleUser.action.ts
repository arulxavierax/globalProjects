import axios from "axios";
import {
  GET_SINGLEUSER_ERROR,
  GET_SINGLEUSER_LOADING,
  GET_SINGLEUSER_SUCCESS,
} from "./singleUser.types";
import { RootState, store } from "../store";
import { Dispatch } from "react";
const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

export const getSingleUsers = (id: any) => async (dispatch: any) => {
  dispatch({ type: GET_SINGLEUSER_LOADING });
  try {
    let res = await axios.get(`http://localhost:8080/users/${+id}`);
    dispatch({ type: GET_SINGLEUSER_SUCCESS, payload: res.data });
    return res.data;
  } catch (e) {
    dispatch({ type: GET_SINGLEUSER_ERROR });
    console.log(e);
  }
};

export const updateSingleUser =
  (id: any, data: any) => async (dispatch: RootState) => {
    try {
      let res = await axios.patch(
        `http://localhost:8080/users/update/${+id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      dispatchStore(getSingleUsers(id));
    } catch (error) {
      console.log(error);
    }
  };

export const deleteUser = (id: any) => async (dispatch: RootState) => {
  try {
    let res = await axios.delete(`http://localhost:8080/users/${+id}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
