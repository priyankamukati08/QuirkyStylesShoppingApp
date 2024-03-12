const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const userCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USERCART_LOADING":
      return { ...state, loading: true };
    case "GET_USERCART_SUCCESS":
      return { ...state, loading: false, cartItems: action.payload };
    case "GET_USERCART_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default userCartReducer;
