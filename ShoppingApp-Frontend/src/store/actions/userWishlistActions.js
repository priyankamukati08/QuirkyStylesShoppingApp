import axios from "axios";
import api from "../api";
import { backendUrl } from "../../config";

const FETCH_USERWISHLIST_LOADING = "FETCH_USERWISHLIST_LOADING";
const FETCH_USERWISHLIST_SUCCESS = "FETCH_USERWISHLIST_SUCCESS";
const FETCH_USERWISHLIST_FAILURE = "FETCH_USERWISHLIST_FAILURE";

const ADD_USERWISHLIST_LOADING = "ADD_USERWISHLIST_LOADING";
const ADD_USERWISHLIST_SUCCESS = "ADD_USERWISHLIST_SUCCESS";
const ADD_USERWISHLIST_FAILURE = "ADD_USERWISHLIST_FAILURE";

const DELETE_USERWISHLIST_LOADING = "DELETE_USERWISHLIST_LOADING";
const DELETE_USERWISHLIST_SUCCESS = "DELETE_USERWISHLIST_SUCCESS";
const DELETE_USERWISHLIST_FAILURE = "DELETE_USERWISHLIST_FAILURE";

export const fetchUserWishlist = (userID) => async (dispatch) => {
  dispatch({ type: FETCH_USERWISHLIST_LOADING });

  try {
    const response = await api.get(
      `${backendUrl}/userWishlist/${userID}`
    );
    dispatch({
      type: FETCH_USERWISHLIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERWISHLIST_FAILURE,
      payload: error.message,
    });
  }
};

export const addProductsToUserWishlist =
  (userId, productId) => async (dispatch) => {
    dispatch({ type: ADD_USERWISHLIST_LOADING });

    try {
      const response = await api.post(`${backendUrl}/userWishlist`, {
        user_id: userId,
        product_id: productId,
      });
      dispatch({
        type: ADD_USERWISHLIST_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ADD_USERWISHLIST_FAILURE,
        payload: error.message,
      });
    }
  };

export const deleteProductsFromUserWishlist =
  (userId, productId) => async (dispatch) => {
    dispatch({ type: DELETE_USERWISHLIST_LOADING });

    try {
      await api.delete(
        `${backendUrl}/userWishlist/${userId}/${productId}`
      );
      dispatch({ type: DELETE_USERWISHLIST_SUCCESS });
    } catch (error) {
      dispatch({
        type: DELETE_USERWISHLIST_FAILURE,
        payload: error.message,
      });
    }
  };
