import axios from "axios";

const GET_PRODUCT_SIZE_COLOR_LOADING = "GET_PRODUCT_SIZE_COLOR_LOADING";
const GET_PRODUCT_SIZE_COLOR_SUCCESS = "GET_PRODUCT_SIZE_COLOR_SUCCESS";
const GET_PRODUCT_SIZE_COLOR_FAILURE = "GET_PRODUCT_SIZE_COLOR_FAILURE";

const ADD_PRODUCT_SIZE_COLOR_LOADING = "ADD_PRODUCT_SIZE_COLOR_LOADING";
const ADD_PRODUCT_SIZE_COLOR_SUCCESS = "ADD_PRODUCT_SIZE_COLOR_SUCCESS";
const ADD_PRODUCT_SIZE_COLOR_FAILURE = "ADD_PRODUCT_SIZE_COLOR_FAILURE";

const UPDATE_PRODUCT_SIZE_COLOR_LOADING = "UPDATE_PRODUCT_SIZE_COLOR_LOADING";
const UPDATE_PRODUCT_SIZE_COLOR_SUCCESS = "UPDATE_PRODUCT_SIZE_COLOR_SUCCESS";
const UPDATE_PRODUCT_SIZE_COLOR_FAILURE = "UPDATE_PRODUCT_SIZE_COLOR_FAILURE";

export const getProductSizeAndColor = (productId) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_SIZE_COLOR_LOADING });
  try {
    const response = await axios.get(
      `http://localhost:3001/productQuantity/${productId}`
    );
    dispatch({ type: GET_PRODUCT_SIZE_COLOR_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_SIZE_COLOR_FAILURE, payload: error.message });
  }
};

export const addProductSizeAndColor =
  (productId, size, color, quantity) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_SIZE_COLOR_LOADING });
    try {
      const response = await axios.post(
        `http://localhost:3001/productQuantity/`,
        { productId, size, color, quantity }
      );
      dispatch({
        type: ADD_PRODUCT_SIZE_COLOR_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_PRODUCT_SIZE_COLOR_FAILURE,
        payload: error.message,
      });
    }
  };

export const updateProductSizeAndColorQuantity =
  (productId, size, color, quantity) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_SIZE_COLOR_LOADING });
    try {
      const response = await axios.put(
        `http://localhost:3001/productQuantity/${productId}/${size}/${color}`,
        { quantity }
      );
      dispatch({
        type: UPDATE_PRODUCT_SIZE_COLOR_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_SIZE_COLOR_FAILURE,
        payload: error.message,
      });
    }
  };
