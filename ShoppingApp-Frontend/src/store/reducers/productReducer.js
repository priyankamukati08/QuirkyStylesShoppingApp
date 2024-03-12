const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_LOADING":
      return { ...state, loading: true };
    case "GET_PRODUCT_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "GET_PRODUCT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default productReducer;
