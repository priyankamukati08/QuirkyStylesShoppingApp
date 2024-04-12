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
    case "ADD_PRODUCT_LOADING":
    case "UPDATE_PRODUCT_LOADING":
    case "DELETE_PRODUCT_LOADING":
      return { ...state, loading: true };
    case "ADD_PRODUCT_SUCCESS":
    case "UPDATE_PRODUCT_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "DELETE_PRODUCT_SUCCESS":
      return { ...state, loading: false, product: null };
    case "ADD_PRODUCT_FAILURE":
    case "UPDATE_PRODUCT_FAILURE":
    case "DELETE_PRODUCT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productByIDReducer;
