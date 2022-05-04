/** @format */
import {
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGIN_REQUEST,
  ADMIN_LOGIN_SUCCESS,
  ADMIN_LOGOUT,
  ADMIN_CREATE_FAIL,
  ADMIN_CREATE_REQUEST,
  ADMIN_CREATE_SUCCESS,
  ADMINS_LIST_FAIL,
  ADMINS_LIST_REQUEST,
  ADMINS_LIST_SUCCESS,
} from "../Constants/AdminConstant";

// ? admin list reducer
export const adminsListReducer = (state = { admins: [] }, action) => {
  switch (action.type) {
    case ADMINS_LIST_REQUEST:
      return {
        loading: true,
        admins: [],
      };
    case ADMINS_LIST_SUCCESS:
      return {
        loading: false,
        admins: action.payload,
      };
    case ADMINS_LIST_FAIL:
      return {
        loading: false,
        admins: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// ? admin login reducer
export const adminLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_LOGIN_REQUEST:
      return { loading: true };
    case ADMIN_LOGIN_SUCCESS:
      return { loading: false, adminInfo: action.payload };
    case ADMIN_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_LOGOUT:
      return {};
    default:
      return state;
  }
};

// ? admin create reducer
export const adminCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_REQUEST:
      return { loading: true };
    case ADMIN_CREATE_SUCCESS:
      return { loading: false, success: true, adminInfo: action.payload };
    case ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
