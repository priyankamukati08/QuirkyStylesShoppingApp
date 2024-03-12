const initialState = {
  addUserInfo: [],
  loading: false,
  error: null,
};

const addUserInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERINFO_LOADING":
      return { ...state, loading: true };
    case "ADD_USERINFO_SUCCESS":
      return { ...state, loading: false, addUserInfo: action.payload };
    case "ADD_USERINFO_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default addUserInfoReducer;
