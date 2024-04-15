const initialState = {
  loading: false,
  userInfoDetails: null,
  error: null,
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERINFO_LOADING":
    case "UPDATE_USERINFO_LOADING": // Add loading case for update action
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_USERINFO_SUCCESS":
    case "UPDATE_USERINFO_SUCCESS": // Add success case for update action
      return {
        ...state,
        loading: false,
        userInfoDetails: action.payload,
        error: null,
      };
    case "FETCH_USERINFO_FAILURE":
    case "UPDATE_USERINFO_FAILURE": // Add failure case for update action
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
