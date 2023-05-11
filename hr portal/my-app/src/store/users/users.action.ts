import axios from "axios";
import {
  GET_USERS_ERROR,
  GET_USERS_LOADING,
  GET_USERS_SUCCESS,
} from "./users.types";

type User = {
  Title: string;
  city: string;
  email: string;
  gender: string;
  name: string;
  phone: string;
};

export const getUsers = () => async (dispatch: any) => {
  dispatch({ type: GET_USERS_LOADING });
  try {
    let res = await axios.get("http://localhost:8080/users");
    dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: GET_USERS_ERROR });
    console.log(e);
  }
};

export const addUser = (form: User) => async (dispatch: any) => {
  try {
    let res = await axios.post("http://localhost:8080/users/adduser", form);
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};
