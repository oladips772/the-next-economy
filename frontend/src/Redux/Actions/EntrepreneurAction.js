/** @format */
import axios from "axios";
import {
  ENTREPRENEURS_LIST_FAIL,
  ENTREPRENEURS_LIST_REQUEST,
  ENTREPRENEURS_LIST_SUCCESS,
  ENTREPRENEUR_DETAILS_FAIL,
  ENTREPRENEUR_DETAILS_REQUEST,
  ENTREPRENEUR_DETAILS_SUCCESS,
  ENTREPRENEUR_CREATE_FAIL,
  ENTREPRENEUR_CREATE_REQUEST,
  ENTREPRENEUR_CREATE_SUCCESS,
  ENTREPRENEUR_UPDATE_REQUEST,
  ENTREPRENEUR_UPDATE_SUCCESS,
  ENTREPRENEUR_UPDATE_FAIL,
  ENTREPRENEUR_DELETE,
} from "../Constants/EntrepreneurConstant";
import URL from "../../url";


// ? list entrepreneurs actions
export const listEntrepreneurs = () => async (dispatch) => {
  try {
    dispatch({
      type: ENTREPRENEURS_LIST_REQUEST,
    });
    const { data } = await axios.get(`${URL}/api/entrepreneurs`);
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

// ? create entreprenuer action
export const EntrepreneurCreate =
  (
    name,
    email,
    image,
    phone,
    year,
    bussiness,
    bio,
    linkedinId,
    facebookId,
    status,
    createdBy,
    updatedBy
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ENTREPRENEUR_CREATE_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${URL}/api/entrepreneurs/create`,
        {
          name,
          email,
          image,
          phone,
          year,
          bussiness,
          bio,
          linkedinId,
          facebookId,
          status,
          createdBy,
          updatedBy,
        },
        config
      );
      dispatch({ type: ENTREPRENEUR_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ENTREPRENEUR_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// ? list entrepreneur details actions
export const listEntrepreneur = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ENTREPRENEUR_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`${URL}/api/entrepreneurs/${id}`);
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

// ? entrepreneur update action
export const updateEntrepreneur =
  (
    id,
    name,
    email,
    image,
    phone,
    year,
    bussiness,
    bio,
    linkedinId,
    facebookId,
    status,
    updatedBy
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ENTREPRENEUR_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `${URL}/api/entrepreneurs/profile/${id}`,
        {
          name,
          email,
          image,
          phone,
          year,
          bussiness,
          bio,
          linkedinId,
          facebookId,
          status,
          updatedBy,
        },
        config
      );
      dispatch({
        type: ENTREPRENEUR_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ENTREPRENEUR_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// ? entrepreneur delete action
export const deleteEntrepreneur = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`${URL}/api/entrepreneurs/${id}`);
    dispatch({
      type: ENTREPRENEUR_DELETE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
