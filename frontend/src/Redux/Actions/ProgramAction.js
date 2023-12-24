/** @format */

import axios from "axios";
import URL from "../../url";

const GetPrograms = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_PROGRAMS_REQUEST" });
    const { data } = await axios.get(`${URL}/api/programs`);
    dispatch({ type: "GET_PROGRAMS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "GET_PROGRAMS_FAIL",
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
          : error.error,
    });
  }
};

export { GetPrograms };
