import axios from "axios";
import api from "../api";
import { backendUrl } from "../../config";


const FETCH_USERORDERS_LOADING = "FETCH_USERORDERS_LOADING";
const FETCH_USERORDERS_SUCCESS = "FETCH_USERORDERS_SUCCESS";
const FETCH_USERORDERS_FAILURE = "FETCH_USERORDERS_FAILURE";

const ADD_USERORDERS_LOADING = "ADD_USERORDERS_LOADING";
const ADD_USERORDERS_SUCCESS = "ADD_USERORDERS_SUCCESS";
const ADD_USERORDERS_FAILURE = "ADD_USERORDERS_FAILURE";

const UPDATE_USERORDERS_LOADING = "UPDATE_USERORDERS_LOADING";
const UPDATE_USERORDERS_SUCCESS = "UPDATE_USERORDERS_SUCCESS";
const UPDATE_USERORDERS_FAILURE = "UPDATE_USERORDERS_FAILURE";

const DELETE_USERORDERS_LOADING = "DELETE_USERORDERS_LOADING";
const DELETE_USERORDERS_SUCCESS = "DELETE_USERORDERS_SUCCESS";
const DELETE_USERORDERS_FAILURE = "DELETE_USERORDERS_FAILURE";

const FETCH_USERORDERS_BY_ORDERID_LOADING =
  "FETCH_USERORDERS_BY_ORDERID_LOADING";
const FETCH_USERORDERS_BY_ORDERID_SUCCESS =
  "FETCH_USERORDERS_BY_ORDERID_SUCCESS";
const FETCH_USERORDERS_BY_ORDERID_FAILURE =
  "FETCH_USERORDERS_BY_ORDERID_FAILURE";

export const fetchUserOrders = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USERORDERS_LOADING });

  try {
    const response = await api.get(
      `${backendUrl}/userOrders/${userId}`
    );
    dispatch({
      type: FETCH_USERORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERORDERS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchUserOrdersByOrderId =
  (userId, orderId) => async (dispatch) => {
    dispatch({ type: FETCH_USERORDERS_BY_ORDERID_LOADING });

    try {
      const response = await api.get(
        `${backendUrl}/userOrders/${userId}/${orderId}`
      );
      dispatch({
        type: FETCH_USERORDERS_BY_ORDERID_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERORDERS_BY_ORDERID_FAILURE,
        payload: error.message,
      });
    }
  };

export const addUserOrders = (USERORDERS) => async (dispatch) => {
  dispatch({ type: ADD_USERORDERS_LOADING });

  try {
    const response = await api.post(
      `${backendUrl}/userOrders`,
      USERORDERS
    );
    dispatch({
      type: ADD_USERORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USERORDERS_FAILURE,
      payload: error.message,
    });
  }
};

export const updateUserOrders = (userId, updatedInfo) => async (dispatch) => {
  dispatch({ type: UPDATE_USERORDERS_LOADING });

  try {
    const response = await api.put(
      `${backendUrl}/userOrders/${userId}`,
      updatedInfo
    );
    dispatch({
      type: UPDATE_USERORDERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USERORDERS_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteUserOrders = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USERORDERS_LOADING });

  try {
    await api.delete(`${backendUrl}/userOrders/${userId}`);
    dispatch({ type: DELETE_USERORDERS_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USERORDERS_FAILURE,
      payload: error.message,
    });
  }
};
