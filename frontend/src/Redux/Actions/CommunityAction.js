/** @format */

import axios from "axios";
import URL from "../../url";

const GetCommunities = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_COMMUNITIES_REQUEST" });
    const { data } = await axios.get(`${URL}/api/communities`);
    dispatch({ type: "GET_COMMUNITIES_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_COMMUNITIES_FAIL",
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export { GetCommunities };
