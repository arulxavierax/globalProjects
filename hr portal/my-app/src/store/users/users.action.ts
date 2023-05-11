import axios from "axios";
import { GET_USERS_ERROR } from "./users.types";

export const getUsers = () => (dispatch: any) => {
  try {
    let res = axios.get("http://localhost:8080/users");
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
