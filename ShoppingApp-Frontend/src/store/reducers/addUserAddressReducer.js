

const initialState = {
  addUserAddress: null,
  loading: false,
  error: null,
};

const addUserAddressReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERADDRESS_LOADING":
      return { ...state, loading: true };
    case "ADD_USERADDRESS_SUCCESS":
      return { ...state, loading: false, addUserAddress: action.payload };
    case "ADD_USERADDRESS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default addUserAddressReducer;
