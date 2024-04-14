const initialState = {
  loading: false,
  userInfoDetails: null,
  error: null,
};

const userInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERINFO_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "FETCH_USERINFO_SUCCESS":
      return {
        ...state,
        loading: false,
        userInfoDetails: action.payload,
        error: null,
      };
    case "FETCH_USERINFO_FAILURE":
      return {
        ...state,
        loading: false,
        userInfoDetails: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userInfoReducer;
