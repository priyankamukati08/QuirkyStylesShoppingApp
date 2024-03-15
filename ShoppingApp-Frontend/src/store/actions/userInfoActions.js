import axios from "axios";
import Cookies from "js-cookie"; // Import js-cookie library
// Action types
const FETCH_USERINFO_LOADING = "FETCH_USERINFO_LOADING";
const FETCH_USERINFO_SUCCESS = "FETCH_USERINFO_SUCCESS";
const FETCH_USERINFO_FAILURE = "FETCH_USERINFO_FAILURE";


const ADD_USERINFO_LOADING = "ADD_USERINFO_LOADING";
const ADD_USERINFO_SUCCESS = "ADD_USERINFO_SUCCESS";
const ADD_USERINFO_FAILURE = "ADD_USERINFO_FAILURE";


const UPDATE_USERINFO_LOADING = "UPDATE_USERINFO_LOADING";
const UPDATE_USERINFO_SUCCESS = "UPDATE_USERINFO_SUCCESS";
const UPDATE_USERINFO_FAILURE = "UPDATE_USERINFO_FAILURE";

const DELETE_USERINFO_LOADING = "DELETE_USERINFO_LOADING";
const DELETE_USERINFO_SUCCESS = "DELETE_USERINFO_SUCCESS";
const DELETE_USERINFO_FAILURE = "DELETE_USERINFO_FAILURE";

// Action creators for fetching userinfo
export const fetchUserInfo = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USERINFO_LOADING }); // Dispatch loading action

  try {
    const response = await axios.get(
      `http://localhost:3001/userinfo/${userId}`
    );
    dispatch({
      type: FETCH_USERINFO_SUCCESS,
      payload: response.data, // Dispatch success action with response data
    });
  } catch (error) {
    // If an error occurs during the request, dispatch a failure action with the error message
    dispatch({
      type: FETCH_USERINFO_FAILURE,
      payload: error.message,
    });
  }
};

// Action creator for adding userinfo
export const addUserInfo = (userInfo) => async (dispatch) => {
  dispatch({ type: ADD_USERINFO_LOADING }); // Dispatch loading action

  try {
    const response = await axios.post(
      "http://localhost:3001/userinfo",
      userInfo
    );
    dispatch({
      type: ADD_USERINFO_SUCCESS,
      payload: response.data, // Dispatch success action with response data
    });
    Cookies.set("userID", response.data.id);
  } catch (error) {
    // If an error occurs during the request, dispatch a failure action with the error message
    dispatch({
      type: ADD_USERINFO_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for updating userinfo
export const updateUserInfo = (userId, updatedInfo) => async (dispatch) => {
  dispatch({ type: UPDATE_USERINFO_LOADING }); // Dispatch loading action

  try {
    const response = await axios.put(
      `http://localhost:3001/userinfo/${userId}`,
      updatedInfo
    );
    dispatch({
      type: UPDATE_USERINFO_SUCCESS,
      payload: response.data, // Dispatch success action with response data
    });
  } catch (error) {
    // If an error occurs during the request, dispatch a failure action with the error message
    dispatch({
      type: UPDATE_USERINFO_FAILURE,
      payload: error.message,
    });
  }
};

// Action creators for deleting userinfo
export const deleteUserInfo = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USERINFO_LOADING }); // Dispatch loading action

  try {
    await axios.delete(`http://localhost:3001/userinfo/${userId}`);
    dispatch({ type: DELETE_USERINFO_SUCCESS }); // Dispatch success action
  } catch (error) {
    // If an error occurs during the request, dispatch a failure action with the error message
    dispatch({
      type: DELETE_USERINFO_FAILURE,
      payload: error.message,
    });
  }
};


