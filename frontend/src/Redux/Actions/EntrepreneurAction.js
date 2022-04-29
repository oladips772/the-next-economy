/** @format */
import axios from "axios";
import {
  ENTREPRENEURS_LIST_FAIL,
  ENTREPRENEURS_LIST_REQUEST,
  ENTREPRENEURS_LIST_SUCCESS,
  ENTREPRENEUR_DETAILS_FAIL,
  ENTREPRENEUR_DETAILS_REQUEST,
  ENTREPRENEUR_DETAILS_SUCCESS,
} from "../Constants/EntrepreneurConstant";

export const listEntrepreneurs = () => async (dispatch) => {
  try {
    dispatch({
      type: ENTREPRENEURS_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/entrepreneurs`);
    dispatch({
      type: ENTREPRENEURS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENTREPRENEURS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const listEntrepreneur = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ENTREPRENEUR_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/entrepreneurs/${id}`);
    dispatch({
      type: ENTREPRENEUR_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENTREPRENEUR_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
