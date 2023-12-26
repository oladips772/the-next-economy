/** @format */
import axios from "axios";
import URL from "../../url";

// ? create community
const CreateCommunity =
  (name, description, whatsappChannel, numberOfMembers) => async (dispatch) => {
    try {
      dispatch({ type: "CREATE_COMMUNITY_REQUEST" });
      await axios.post(`${URL}/api/communities/create`, {
        name,
        description,
        whatsappChannel,
        numberOfMembers,
      });
      dispatch({ type: "CREATE_COMMUNITY_SUCCESS" });
    } catch (error) {
      dispatch({
        type: "CREATE_COMMUNITY_FAIL",
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.error,
      });
    }
  };

// ? get community
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

// ? update
const UpdateCommunity =
  (id, name, description, whatsappChannel, numberOfMembers) =>
  async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_COMMUNITY_REQUEST" });
      const { data } = await axios.put(`${URL}/api/communities/${id}`, {
        name,
        description,
        whatsappChannel,
        numberOfMembers,
      });
      dispatch({ type: "UPDATE_COMMUNITY_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "UPDATE_COMMUNITY_FAIL",
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.error,
      });
    }
  };

export { GetCommunities, CreateCommunity, UpdateCommunity };
