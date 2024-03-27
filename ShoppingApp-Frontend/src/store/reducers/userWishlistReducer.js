const initialState = {
  wishlistItems: [],
  loading: false,
  error: null,
};

const userWishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERWISHLIST_LOADING":
      return { ...state, loading: true };
    case "FETCH_USERWISHLIST_SUCCESS":
      return {
        ...state,
        loading: false,
        wishlistItems: action.payload,
      };
    case "FETCH_USERWISHLIST_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default userWishlistReducer;
