const initialState = {
  loading: false,
  error: null,
  productSizeColor: {},
};

const productQuantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_SIZE_COLOR_LOADING":
    case "ADD_PRODUCT_SIZE_COLOR_LOADING":
    case "UPDATE_PRODUCT_SIZE_COLOR_LOADING":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "GET_PRODUCT_SIZE_COLOR_SUCCESS":
    case "ADD_PRODUCT_SIZE_COLOR_SUCCESS":
    case "UPDATE_PRODUCT_SIZE_COLOR_SUCCESS":
      const productSizeColor = action.payload.reduce((acc, item) => {
        acc[item.product_size] = parseInt(item.total_quantity, 10);
        return acc;
      }, {});
      return {
        ...state,
        loading: false,
        error: null,
        productSizeColor: productSizeColor,
      };
    case "GET_PRODUCT_SIZE_COLOR_FAILURE":
    case "ADD_PRODUCT_SIZE_COLOR_FAILURE":
    case "UPDATE_PRODUCT_SIZE_COLOR_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        productSizeColor: {},
      };
    default:
      return state;
  }
};

export default productQuantityReducer;
