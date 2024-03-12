const initialState = {
  addProductsCartItems: [],
  loading: false,
  error: null,
};

const addProductToUserCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDPRODUCT_TO_USERCART_LOADING":
      return { ...state, loading: true };
    case "ADDPRODUCT_TO_USERCART_SUCCESS":
      return { ...state, loading: false, addProductsCartItems: action.payload };
    case "ADDPRODUCT_TO_USERCART_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default addProductToUserCartReducer;
