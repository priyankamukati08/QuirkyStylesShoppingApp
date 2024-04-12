import axios from "axios";
import api from "../api";

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

export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_LOADING });
  try {
    const response = await api.get("http://localhost:3001/products");
    dispatch({ type: GET_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_FAILURE, payload: error.message });
  }
};

// a thunk is a function that is returned from another function (getProductById).
//a thunk function takes dispatch (and getState) as parameters.
// a thunk function. initially dispatches an action to say the request started then.
// waits for the ajax call to return and then dispatches another action (either success or failure)

export const getProductById = (productId) => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_BY_ID_LOADING });
  try {
    const response = await api.get(
      `http://localhost:3001/products/${productId}`
    );
    dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};

export const addProduct = (productData) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_LOADING });
  try {
    const response = await api.post(
      "http://localhost:3001/products",
      productData
    );
    dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAILURE, payload: error.message });
  }
};

export const updateProduct = (productId, productData) => async (dispatch) => {
  dispatch({ type: UPDATE_PRODUCT_LOADING });
  try {
    const response = await api.put(
      `http://localhost:3001/products/${productId}`,
      productData
    );
    dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: UPDATE_PRODUCT_FAILURE, payload: error.message });
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_LOADING });
  try {
    await api.delete(`http://localhost:3001/products/${productId}`);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: productId });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAILURE, payload: error.message });
  }
};




