const initialState = {
  searchproducts: [],
  loading: false,
  error: null,
};

const searchProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SEARCH_PRODUCT_LOADING":
      return { ...state, loading: true };
    case "SEARCH_PRODUCT_SUCCESS":
      return { ...state, loading: false, searchproducts: action.payload };
    case "SEARCH_PRODUCT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default searchProductReducer;
