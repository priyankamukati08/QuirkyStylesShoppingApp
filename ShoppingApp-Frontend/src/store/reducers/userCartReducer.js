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
      return {
        ...state,
        loading: false,
        cartItems: action.payload,
        error: null,
      };
    case "GET_USERCART_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "UPDATE_USERCART":
      return {
        ...state,
        cartItems: action.payload,
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};
export default userCartReducer;
