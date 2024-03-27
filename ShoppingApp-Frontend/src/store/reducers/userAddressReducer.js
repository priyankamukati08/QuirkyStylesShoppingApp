

const initialState = {
  userAddress: [],
  loading: false,
  error: null,
};

const userAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERADDRESS_LOADING":
      return { ...state, loading: true };
    case "FETCH_USERADDRESS_SUCCESS":
      return { ...state, loading: false, userAddress: action.payload };
    case "FETCH_USERADDRESS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userAddressReducer;
