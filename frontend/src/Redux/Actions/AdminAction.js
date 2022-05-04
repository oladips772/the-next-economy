/** @format */
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_CREATE_FAIL,
  ADMIN_CREATE_REQUEST,
  ADMIN_CREATE_SUCCESS,
} from "../Constants/AdminConstant";
import axios from "axios";

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


