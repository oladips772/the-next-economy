/** @format */
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_CREATE_FAIL,
  ADMIN_CREATE_REQUEST,
  ADMIN_CREATE_SUCCESS,
  ADMIN_DELETE,
  ADMIN_DISABLE,
  ADMIN_ENABLE,
  ADMINS_LIST_REQUEST,
  ADMINS_LIST_SUCCESS,
  ADMINS_LIST_FAIL,
} from "../Constants/AdminConstant";
import axios from "axios";

// ? get all admins action
export const listAdmins = () => async (dispatch) => {
  try {
    dispatch({ type: ADMINS_LIST_REQUEST });
    const { data } = await axios.get(`/api/admins`);
    dispatch({ type: ADMINS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMINS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ? admin login action
export const AdminLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_LOGIN_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/admins/login`,
      { email, password },
      config
    );
    dispatch({ type: ADMIN_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: ADMIN_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ? admin create action
export const AdminCreate = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CREATE_REQUEST });
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/admins/register`,
      { name, email, password },
      config
    );
    dispatch({ type: ADMIN_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ? admin logout action
export const AdminLogout = () => async (dispatch) => {
  dispatch({ type: ADMIN_LOGOUT });
  localStorage.removeItem("adminInfo");
};

// ? admin delete action
export const deleteAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`/api/admins/${id}`);
    dispatch({
      type: ADMIN_DELETE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// ? admin disable action
export const disableAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/admins/disable/${id}`);
    dispatch({
      type: ADMIN_DISABLE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

// ? admin disable action
export const enableAdmin = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(`/api/admins/enable/${id}`);
    dispatch({
      type: ADMIN_ENABLE,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
