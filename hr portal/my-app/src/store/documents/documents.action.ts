import axios from "axios";
import {
  GET_DOCUMENTS_ERROR,
  GET_DOCUMENTS_LOADING,
  GET_DOCUMENTS_SUCCESS,
} from "./documents.types";
import { RootState, store } from "../store";
import { Dispatch } from "react";
import qs from "qs";
const dispatchStore = store.dispatch as typeof store.dispatch | Dispatch<any>;

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
      dispatchStore(getDocuments(id));
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

export const downloadDocument =
  (serverUrl: string) => async (dispatch: RootState) => {
    try {
      let res = await axios.get("http://localhost:8080/doc/download", {
        params: { serverUrl },
        paramsSerializer: (params) => {
          return qs.stringify(params, { encode: false });
        },
        responseType: "blob",
      });
      const blob = new Blob([res.data]);
      const downloadLink = document.createElement("a");

      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute("download", serverUrl.split("/").pop() || "");
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (error) {
      console.log(error);
    }
  };
