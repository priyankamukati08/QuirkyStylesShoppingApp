import axios from "axios";

const ADD_USERADDRESS_LOADING = "ADD_USERADDRESS_LOADING";
const ADD_USERADDRESS_SUCCESS = "ADD_USERADDRESS_SUCCESS";
const ADD_USERADDRESS_FAILURE = "ADD_USERADDRESS_FAILURE";

const FETCH_USERADDRESS_LOADING = "FETCH_USERADDRESS_LOADING";
const FETCH_USERADDRESS_SUCCESS = "FETCH_USERADDRESS_SUCCESS";
const FETCH_USERADDRESS_FAILURE = "FETCH_USERADDRESS_FAILURE";

const UPDATE_USERADDRESS_LOADING = "UPDATE_USERADDRESS_LOADING";
const UPDATE_USERADDRESS_SUCCESS = "UPDATE_USERADDRESS_SUCCESS";
const UPDATE_USERADDRESS_FAILURE = "UPDATE_USERADDRESS_FAILURE";

const DELETE_USERADDRESS_LOADING = "DELETE_USERADDRESS_LOADING";
const DELETE_USERADDRESS_SUCCESS = "DELETE_USERADDRESS_SUCCESS";
const DELETE_USERADDRESS_FAILURE = "DELETE_USERADDRESS_FAILURE";

export const addUserAddress = (userAddress, userId) => async (dispatch) => {
  dispatch({ type: ADD_USERADDRESS_LOADING });

  try {
    const response = await axios.post(
      "http://localhost:3001/useraddress",{
      ...userAddress,
      user_id: userId,
  });
    dispatch({
      type: ADD_USERADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USERADDRESS_FAILURE,
      payload: error.message,
    });
  }
};

export const fetchUserAddress = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USERADDRESS_LOADING });

  try {
    const response = await axios.get(
      `http://localhost:3001/useraddress/${userId}`,
      userId
    );
    dispatch({
      type: FETCH_USERADDRESS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERADDRESS_FAILURE,
      payload: error.message,
    });
  }
};

export const updateUserAddress =
  (userId, addressId, updatedAddressData) => async (dispatch) => {
    dispatch({ type: UPDATE_USERADDRESS_LOADING });

    try {
      const response = await axios.put(
        `http://localhost:3001/useraddress/${userId}/${addressId}`,
        updatedAddressData // Pass updatedAddressData directly
      );
      dispatch({
        type: UPDATE_USERADDRESS_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_USERADDRESS_FAILURE,
        payload: error.message,
      });
    }
  };


export const deleteUserAddress = (userId, addressId) => async (dispatch) => {
  dispatch({ type: DELETE_USERADDRESS_LOADING });

  try {
    await axios.delete(
      `http://localhost:3001/useraddress/${userId}/${addressId}`
    );
    // After successful deletion, you might want to fetch the updated user addresses
    //dispatch(updateUserAddress(userId));
  } catch (error) {
    dispatch({
      type: DELETE_USERADDRESS_FAILURE,
      payload: error.message,
    });
  }
};

