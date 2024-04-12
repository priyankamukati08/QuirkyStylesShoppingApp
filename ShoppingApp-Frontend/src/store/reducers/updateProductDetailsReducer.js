import api from "../api";

// Action types for product actions
const GET_PRODUCT_LOADING = "GET_PRODUCT_LOADING";
const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
const GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE";

const GET_PRODUCT_BY_ID_LOADING = "GET_PRODUCT_BY_ID_LOADING";
const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
const GET_PRODUCT_BY_ID_FAILURE = "GET_PRODUCT_BY_ID_FAILURE";

const ADD_PRODUCT_LOADING = "ADD_PRODUCT_LOADING";
const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

const UPDATE_PRODUCT_LOADING = "UPDATE_PRODUCT_LOADING";
const UPDATE_PRODUCT_SUCCESS = "UPDATE_PRODUCT_SUCCESS";
const UPDATE_PRODUCT_FAILURE = "UPDATE_PRODUCT_FAILURE";

const DELETE_PRODUCT_LOADING = "DELETE_PRODUCT_LOADING";
const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

// Action types for product quantity actions
const GET_PRODUCT_SIZE_COLOR_LOADING = "GET_PRODUCT_SIZE_COLOR_LOADING";
const GET_PRODUCT_SIZE_COLOR_SUCCESS = "GET_PRODUCT_SIZE_COLOR_SUCCESS";
const GET_PRODUCT_SIZE_COLOR_FAILURE = "GET_PRODUCT_SIZE_COLOR_FAILURE";

const ADD_PRODUCT_SIZE_COLOR_LOADING = "ADD_PRODUCT_SIZE_COLOR_LOADING";
const ADD_PRODUCT_SIZE_COLOR_SUCCESS = "ADD_PRODUCT_SIZE_COLOR_SUCCESS";
const ADD_PRODUCT_SIZE_COLOR_FAILURE = "ADD_PRODUCT_SIZE_COLOR_FAILURE";

const UPDATE_PRODUCT_SIZE_COLOR_LOADING = "UPDATE_PRODUCT_SIZE_COLOR_LOADING";
const UPDATE_PRODUCT_SIZE_COLOR_SUCCESS = "UPDATE_PRODUCT_SIZE_COLOR_SUCCESS";
const UPDATE_PRODUCT_SIZE_COLOR_FAILURE = "UPDATE_PRODUCT_SIZE_COLOR_FAILURE";

const UPDATE_PRODUCT_SIZE_COLOR_ADMIN_LOADING =
  "UPDATE_PRODUCT_SIZE_COLOR_ADMIN_LOADING";
const UPDATE_PRODUCT_SIZE_COLOR_ADMIN_SUCCESS =
  "UPDATE_PRODUCT_SIZE_COLOR_ADMIN_SUCCESS";
const UPDATE_PRODUCT_SIZE_COLOR_ADMIN_FAILURE =
  "UPDATE_PRODUCT_SIZE_COLOR_ADMIN_FAILURE";

const GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_LOADING =
  "GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_LOADING";
const GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_SUCCESS =
  "GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_SUCCESS";
const GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_FAILURE =
  "GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_FAILURE";

const initialState = {
  // Product state
  products: [],
  loading: false,
  error: null,

  // Product quantity state
  allProductSizeQuantity: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    // Product actions
    case GET_PRODUCT_LOADING:
    case GET_PRODUCT_BY_ID_LOADING:
    case ADD_PRODUCT_LOADING:
    case UPDATE_PRODUCT_LOADING:
    case DELETE_PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case GET_PRODUCT_BY_ID_SUCCESS:
    case ADD_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_SUCCESS:
      // Assuming these actions only affect a single product, so updating that product in the state
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
        loading: false,
      };
    case DELETE_PRODUCT_SUCCESS:
      // Assuming the payload contains the ID of the deleted product
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
        loading: false,
      };
    case GET_PRODUCT_FAILURE:
    case GET_PRODUCT_BY_ID_FAILURE:
    case ADD_PRODUCT_FAILURE:
    case UPDATE_PRODUCT_FAILURE:
    case DELETE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // Product quantity actions
    case GET_PRODUCT_SIZE_COLOR_LOADING:
    case ADD_PRODUCT_SIZE_COLOR_LOADING:
    case UPDATE_PRODUCT_SIZE_COLOR_LOADING:
    case UPDATE_PRODUCT_SIZE_COLOR_ADMIN_LOADING:
    case GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_PRODUCT_SIZE_COLOR_SUCCESS:
      // Assuming the payload contains the product quantity data for a specific product
      return {
        ...state,
        loading: false,
        allProductSizeQuantity: {
          ...state.allProductSizeQuantity,
          [action.payload.productId]: action.payload.data,
        },
      };
    case ADD_PRODUCT_SIZE_COLOR_SUCCESS:
    case UPDATE_PRODUCT_SIZE_COLOR_SUCCESS:
    case UPDATE_PRODUCT_SIZE_COLOR_ADMIN_SUCCESS:
      // Assuming the payload contains the updated product quantity data for a specific product
      return {
        ...state,
        loading: false,
        allProductSizeQuantity: {
          ...state.allProductSizeQuantity,
          [action.payload.productId]: action.payload.data,
        },
      };
    case GET_PRODUCT_SIZE_COLOR_FAILURE:
    case ADD_PRODUCT_SIZE_COLOR_FAILURE:
    case UPDATE_PRODUCT_SIZE_COLOR_FAILURE:
    case UPDATE_PRODUCT_SIZE_COLOR_ADMIN_FAILURE:
    case GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
