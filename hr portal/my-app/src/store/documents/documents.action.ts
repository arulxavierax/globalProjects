import axios from "axios";
import {
  GET_DOCUMENTS_ERROR,
  GET_DOCUMENTS_LOADING,
  GET_DOCUMENTS_SUCCESS,
} from "./documents.types";
import { RootState } from "../store";

export const getDocuments = (id: any) => async (dispatch: any) => {
  dispatch({ type: GET_DOCUMENTS_LOADING });
  try {
    let res = await axios.get(`http://localhost:8080/doc/${id}`);
    dispatch({ type: GET_DOCUMENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({ type: GET_DOCUMENTS_ERROR });
    console.log(error);
  }
};

export const uploadDocument =
  (id: any, data: any) => async (dispatch: RootState) => {
    try {
      let res = await axios.post(`http://localhost:8080/doc/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
