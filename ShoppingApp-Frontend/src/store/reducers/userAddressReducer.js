const initialState = {
  userAddress: [],
  loading: false,
  error: null,
};

const userAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERADDRESS_LOADING":
    case "UPDATE_USERADDRESS_LOADING":
    case "DELETE_USERADDRESS_LOADING":
      return { ...state, loading: true };
    case "FETCH_USERADDRESS_SUCCESS":
    case "UPDATE_USERADDRESS_SUCCESS":
      return { ...state, loading: false, userAddress: action.payload };
    case "DELETE_USERADDRESS_SUCCESS":
      // When successfully deleting, we might want to reset userAddress to null
      return { ...state, loading: false, userAddress: [] };
    case "FETCH_USERADDRESS_FAILURE":
    case "UPDATE_USERADDRESS_FAILURE":
    case "DELETE_USERADDRESS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userAddressReducer;
