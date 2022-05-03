/** @format */
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
  ENTREPRENEUR_UPDATE_RESET,
} from "../Constants/EntrepreneurConstant";

// ? entrepreneur list reducers
export const entrepreneurListReducer = (
  state = { entrepreneurs: [] },
  action
) => {
  switch (action.type) {
    case ENTREPRENEURS_LIST_REQUEST:
      return {
        loading: true,
        entrepreneurs: [],
      };
    case ENTREPRENEURS_LIST_SUCCESS:
      return {
        loading: false,
        entrepreneurs: action.payload,
      };
    case ENTREPRENEURS_LIST_FAIL:
      return {
        loading: false,
        entrepreneurs: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

// ? entrepreneur details
export const entrepreneurDetailsReducer = (
  state = { entrepreneur: {} },
  action
) => {
  switch (action.type) {
    case ENTREPRENEUR_DETAILS_REQUEST:
      return {
        loading: true,
        entrepreneur: {},
      };
    case ENTREPRENEUR_DETAILS_SUCCESS:
      return {
        loading: false,
        entrepreneur: action.payload,
      };
    case ENTREPRENEUR_DETAILS_FAIL:
      return {
        loading: false,
        entrepreneur: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

// ? entreprenuer create reducer
export const entrepreneurCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTREPRENEUR_CREATE_REQUEST:
      return { loading: true };
    case ENTREPRENEUR_CREATE_SUCCESS:
      return { loading: false, success: true, entreprenuer: action.payload };
    case ENTREPRENEUR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// ? entreprenuer update reducer
export const entrepreneurUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ENTREPRENEUR_UPDATE_REQUEST:
      return { loading: true };
    case ENTREPRENEUR_UPDATE_SUCCESS:
      return { loading: false, success: true, entreprenuer: action.payload };
    case ENTREPRENEUR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
