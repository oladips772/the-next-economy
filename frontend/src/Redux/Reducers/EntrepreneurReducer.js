/** @format */
import {
  ENTREPRENEURS_LIST_FAIL,
  ENTREPRENEURS_LIST_REQUEST,
  ENTREPRENEURS_LIST_SUCCESS,
  ENTREPRENEUR_DETAILS_FAIL,
  ENTREPRENEUR_DETAILS_REQUEST,
  ENTREPRENEUR_DETAILS_SUCCESS,
} from "../Constants/EntrepreneurConstant";

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
