
import api from "../api";
import { backendUrl } from "../../config";

const GET_PRODUCT_SIZE_COLOR_LOADING = "GET_PRODUCT_SIZE_COLOR_LOADING";
const GET_PRODUCT_SIZE_COLOR_SUCCESS = "GET_PRODUCT_SIZE_COLOR_SUCCESS";
const GET_PRODUCT_SIZE_COLOR_FAILURE = "GET_PRODUCT_SIZE_COLOR_FAILURE";

const ADD_PRODUCT_SIZE_COLOR_LOADING = "ADD_PRODUCT_SIZE_COLOR_LOADING";
const ADD_PRODUCT_SIZE_COLOR_SUCCESS = "ADD_PRODUCT_SIZE_COLOR_SUCCESS";
const ADD_PRODUCT_SIZE_COLOR_FAILURE = "ADD_PRODUCT_SIZE_COLOR_FAILURE";

const UPDATE_PRODUCT_SIZE_COLOR_LOADING = "UPDATE_PRODUCT_SIZE_COLOR_LOADING";
const UPDATE_PRODUCT_SIZE_COLOR_SUCCESS = "UPDATE_PRODUCT_SIZE_COLOR_SUCCESS";
const UPDATE_PRODUCT_SIZE_COLOR_FAILURE = "UPDATE_PRODUCT_SIZE_COLOR_FAILURE";

const UPDATE_PRODUCT_SIZE_COLOR_ADMIN_LOADING = "UPDATE_PRODUCT_SIZE_COLOR_LOADING";
const UPDATE_PRODUCT_SIZE_COLOR_ADMIN_SUCCESS =
  "UPDATE_PRODUCT_SIZE_COLOR_SUCCESS";
const UPDATE_PRODUCT_SIZE_COLOR_ADMIN_FAILURE =
  "UPDATE_PRODUCT_SIZE_COLOR_FAILURE";

const GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_LOADING =
  "GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_LOADING";
const GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_SUCCESS =
  "GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_SUCCESS";
const GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_FAILURE =
  "GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_FAILURE";

export const getProductSizeAndColor = (productId) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_SIZE_COLOR_LOADING });
  try {
    const response = await api.get(
      `${backendUrl}/productQuantity/${productId}`
    );
    dispatch({ type: GET_PRODUCT_SIZE_COLOR_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_SIZE_COLOR_FAILURE, payload: error.message });
  }
};

export const getAllProductSizesAndQuantities = () => async (dispatch) => {
  dispatch({ type: GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_LOADING });
  try {
    const response = await api.get(`${backendUrl}/productQuantity/`);
    dispatch({
      type: GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PRODUCT_SIZES_AND_QUANTITIES_FAILURE,
      payload: error.message,
    });
  }
};

export const addProductSizeAndColor =
  (productId, size, color, quantity) => async (dispatch) => {
    dispatch({ type: ADD_PRODUCT_SIZE_COLOR_LOADING });
    try {
      const response = await api.post(
        `${backendUrl}/productQuantityByAdmin/`,
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
  (productId, size, quantity) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_SIZE_COLOR_LOADING });
    try {
      const response = await api.put(
        `${backendUrl}/productQuantity/${productId}/${size}`,
        { productId, size, quantity }
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


export const updateProductSizeAndColorQuantityByAdmin =
  (productId, size, quantity) => async (dispatch) => {
    dispatch({ type: UPDATE_PRODUCT_SIZE_COLOR_ADMIN_LOADING });
    try {
      const response = await api.put(
        `${backendUrl}/productQuantityByAdmin/${productId}/${size}`,
        { productId, size, quantity }
      );
      // Assuming response.data is an object containing product size and quantity data
      const updatedProductSizeAndQuantity = [
        { size, quantity: response.data.quantity }, // Adjust the structure based on the actual response format
      ];
      dispatch({
        type: UPDATE_PRODUCT_SIZE_COLOR_ADMIN_SUCCESS,
        payload: updatedProductSizeAndQuantity,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_PRODUCT_SIZE_COLOR_ADMIN_FAILURE,
        payload: error.message,
      });
    }
  };




