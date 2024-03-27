const initialState = {
  userOrders: [],
  loading: false,
  error: null,
};

const userOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERORDERS_LOADING":
      return { ...state, loading: true };
    case "FETCH_USERORDERS_SUCCESS":
      return { ...state, loading: false, userOrders: action.payload };
    case "FETCH_USERORDERS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default userOrdersReducer;
