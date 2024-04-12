const initialState = {
  userOrder: [],
  loading: false,
  error: null,
};

const userOrdersByOrderIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERORDERS_BY_ORDERID_LOADING":
      return { ...state, loading: true };
    case "FETCH_USERORDERS_BY_ORDERID_SUCCESS":
      return {
        ...state,
        loading: false,
        userOrder: action.payload,
        error: null,
      };
    case "FETCH_USERORDERS_BY_ORDERID_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userOrdersByOrderIdReducer;
