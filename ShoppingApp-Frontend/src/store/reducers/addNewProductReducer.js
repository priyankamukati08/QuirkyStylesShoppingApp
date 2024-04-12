const initialState = {
  addNewProduct: [],
  loading: false,
  error: null,
};

const addNewProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_PRODUCT_LOADING":
      return { ...state, loading: true };
    case "ADD_PRODUCT_SUCCESS":
      return { ...state, loading: false, addNewProduct: action.payload };
    case "ADD_PRODUCT_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default addNewProductReducer;
