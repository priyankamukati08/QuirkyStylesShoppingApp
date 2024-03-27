const initialState = {
  addProductsToUserWishlist: [],
  loading: false,
  error: null,
};

const addProductsToUserWishlist = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERWISHLIST_LOADING":
      return { ...state, loading: true };
    case "ADD_USERWISHLIST_SUCCESS":
      return {
        ...state,
        loading: false,
        addProductsToUserWishlist: action.payload,
      };
    case "ADD_USERWISHLIST_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default addProductsToUserWishlist;
