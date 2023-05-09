import axios from "axios";
import { GET_USERS_ERROR } from "./users.types";

export const getUsers = () => (dispatch: any) => {
  try {
    axios.get("");
  } catch (e) {
    console.log(e);
  }
};
