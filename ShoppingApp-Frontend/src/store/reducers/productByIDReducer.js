const initialState = {
  product: null,
  loading: false,
  error: null,
};

const productByIDReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_BY_ID_LOADING":
      return { ...state, loading: true };
    case "GET_PRODUCT_BY_ID_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "GET_PRODUCT_BY_ID_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default productByIDReducer;
