/** @format */
import axios from "axios";
import {
  DEVELOPERS_LIST_FAIL,
  DEVELOPERS_LIST_REQUEST,
  DEVELOPERS_LIST_SUCCESS,
  DEVELOPER_DETAILS_FAIL,
  DEVELOPER_DETAILS_REQUEST,
  DEVELOPER_DETAILS_SUCCESS,
  DEVELOPER_CREATE_FAIL,
  DEVELOPER_CREATE_REQUEST,
  DEVELOPER_CREATE_SUCCESS,
  DEVELOPER_UPDATE_REQUEST,
  DEVELOPER_UPDATE_SUCCESS,
  DEVELOPER_UPDATE_FAIL,
  DEVELOPER_DELETE,
} from "../Constants/DeveloperConstant";

// ? list developers actions
export const listDevelopers = () => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPERS_LIST_REQUEST,
    });
    const { data } = await axios.get(`/api/developers`);
    dispatch({
      type: DEVELOPERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEVELOPERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ? create developer action
export const DeveloperCreate =
  (
    name,
    email,
    image,
    phone,
    gender,
    cohort,
    linkedinId,
    facebookId,
    createdBy,
    updatedBy
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: DEVELOPER_CREATE_REQUEST });
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/developers/create`,
        {
          name,
          email,
          image,
          phone,
          gender,
          cohort,
          linkedinId,
          facebookId,
          createdBy,
          updatedBy,
        },
        config
      );
      dispatch({ type: DEVELOPER_CREATE_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: DEVELOPER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// ? list developer details actions
export const listDeveloper = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/developers/${id}`);
    dispatch({
      type: DEVELOPER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEVELOPER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ? update developer action
export const updateDeveloper =
  (
    id,
    name,
    email,
    image,
    phone,
    gender,
    cohort,
    linkedinId,
    facebookId,
    updatedBy
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DEVELOPER_UPDATE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.put(
        `/api/developers/profile/${id}`,
        {
          name,
          email,
          image,
          phone,
          gender,
          cohort,
          linkedinId,
          facebookId,
          updatedBy,
        },
        config
      );
      dispatch({
        type: DEVELOPER_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEVELOPER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// ? delete developer action
export const deleteDeveloper = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/developers/${id}`);
    dispatch({
      type: DEVELOPER_DELETE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
