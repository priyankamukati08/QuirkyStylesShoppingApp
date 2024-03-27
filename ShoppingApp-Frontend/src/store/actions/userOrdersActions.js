import axios from "axios";


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

export const fetchUserOrders = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USERORDERS_LOADING });

  try {
    const response = await axios.get(
      `http://localhost:3001/userOrders/${userId}`
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

export const addUserOrders = (USERORDERS) => async (dispatch) => {
  dispatch({ type: ADD_USERORDERS_LOADING });

  try {
    const response = await axios.post(
      "http://localhost:3001/userOrders",
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
    const response = await axios.put(
      `http://localhost:3001/userOrders/${userId}`,
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
    await axios.delete(`http://localhost:3001/userOrders/${userId}`);
    dispatch({ type: DELETE_USERORDERS_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USERORDERS_FAILURE,
      payload: error.message,
    });
  }
};