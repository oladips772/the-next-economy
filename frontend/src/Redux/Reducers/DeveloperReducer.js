/** @format */
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
} from "../Constants/DeveloperConstant";

// ? developers list reducers
export const developerListReducer = (state = { developers: [] }, action) => {
  switch (action.type) {
    case DEVELOPERS_LIST_REQUEST:
      return {
        loading: true,
        developers: [],
      };
    case DEVELOPERS_LIST_SUCCESS:
      return {
        loading: false,
        developers: action.payload,
      };
    case DEVELOPERS_LIST_FAIL:
      return {
        loading: false,
        developers: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// ? developer details reducers
export const developerDetailsReducer = (state = { developer: {} }, action) => {
  switch (action.type) {
    case DEVELOPER_DETAILS_REQUEST:
      return {
        loading: true,
        developer: {},
      };
    case DEVELOPER_DETAILS_SUCCESS:
      return {
        loading: false,
        developer: action.payload,
      };
    case DEVELOPER_DETAILS_FAIL:
      return {
        loading: false,
        developer: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

// ? developer create reducers
export const developerCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPER_CREATE_REQUEST:
      return { loading: true };
    case DEVELOPER_CREATE_SUCCESS:
      return { loading: false, success: true, developer: action.payload };
    case DEVELOPER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case "DEVELOPER_CREATE_RESET":
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};

// ? developer update reducers
export const developerUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPER_UPDATE_REQUEST:
      return { loading: true };
    case DEVELOPER_UPDATE_SUCCESS:
      return { loading: false, success: true, developer: action.payload };
    case DEVELOPER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case "DEVELOPER_UPDATE_RESET":
      return { loading: false, error: null, success: false };
    default:
      return state;
  }
};
