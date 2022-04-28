/** @format */
import {
  ENTREPRENEURS_LIST_FAIL,
  ENTREPRENEURS_LIST_REQUEST,
  ENTREPRENEURS_LIST_SUCCESS,
} from "../Constants/EntrepreneurConstant";

export const entrepreneurListReducer = (
  state = { entrepreneurs: [] },
  action
) => {
  switch (action.payload) {
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
