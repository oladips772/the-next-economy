/** @format */
import axios from "axios";
import {
  ENTREPRENEURS_LIST_FAIL,
  ENTREPRENEURS_LIST_REQUEST,
  ENTREPRENEURS_LIST_SUCCESS,
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
