const initialState = {
  loading: false,
  error: null,
  allProductSizeQuantity: {},
};

const allProductSizeQuantityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_SUCCESS":
      const allProductSizeQuantity = action.payload.reduce((acc, item) => {
        const productId = item.product_id;
        const size = item.product_size;
        const quantity = parseInt(item.total_quantity, 10);
        if (!acc[productId]) {
          acc[productId] = [];
        }
        acc[productId].push({ size, quantity });
        return acc;
      }, {});
      return {
        ...state,
        loading: false,
        error: null,
        allProductSizeQuantity: allProductSizeQuantity,
      };
    case "const GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
        allProductSizeQuantity: {},
      };
    default:
      return state;
  }
};

export default allProductSizeQuantityReducer;
