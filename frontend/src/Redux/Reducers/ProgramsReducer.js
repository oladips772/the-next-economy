/** @format */
// ? get all programs reducer
const getProgramsReducer = (state = { programs: [] }, action) => {
  switch (action.type) {
    case "GET_PROGRAMS_REQUEST":
      return {
        programsLoading: true,
      };
    case "GET_PROGRAMS_SUCCESS":
      return {
        programsLoading: false,
        programs: action.payload,
      };
    case "GET_PROGRAMS_FAIL":
      return {
        programsLoading: false,
        programs: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export { getProgramsReducer };
