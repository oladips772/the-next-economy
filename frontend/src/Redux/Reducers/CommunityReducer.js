/** @format */
// ? create community reducer
const createCommunityReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_COMMUNITY_REQUEST":
      return {
        loading: true,
      };
    case "CREATE_COMMUNITY_SUCCESS":
      return {
        loading: false,
        success: true,
      };
    case "CREATE_COMMUNITY_FAIL":
      return {
        loading: false,
        success: false,
        error: action.payload,
      };
    case "CREATE_COMMUNITY_RESET":
      return {
        loading: false,
        success: false,
        error: null,
      };
    default:
      return state;
  }
};

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

export { getCommunitiesReducer, createCommunityReducer };
