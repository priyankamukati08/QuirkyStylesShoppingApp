import axios from "axios";

const ADD_USERADDRESS_LOADING = "ADD_USERADDRESS_LOADING";
const ADD_USERADDRESS_SUCCESS = "ADD_USERADDRESS_SUCCESS";
const ADD_USERADDRESS_FAILURE = "ADD_USERADDRESS_FAILURE";

const FETCH_USERADDRESS_LOADING = "FETCH_USERADDRESS_LOADING";
const FETCH_USERADDRESS_SUCCESS = "FETCH_USERADDRESS_SUCCESS";
const FETCH_USERADDRESS_FAILURE = "FETCH_USERADDRESS_FAILURE";

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
