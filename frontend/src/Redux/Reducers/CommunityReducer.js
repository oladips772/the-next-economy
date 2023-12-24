/** @format */
// ? get all communities reducer
const getCommunitiesReducer = (state = { communities: [] }, action) => {
  switch (action.type) {
    case "GET_COMMUNITIES_REQUEST":
      return {
        loading: true,
      };
    case "GET_COMMUNITIES_SUCCESS":
      return {
        loading: false,
        communities: action.payload,
      };
    case "GET_COMMUNITIES_FAIL":
      return {
        loading: false,
        communities: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export { getCommunitiesReducer };
