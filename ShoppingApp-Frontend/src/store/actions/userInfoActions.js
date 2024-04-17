
import api from "../api";
import { backendUrl } from "../../config";

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

export const fetchUserInfo = (userId) => async (dispatch) => {
  dispatch({ type: FETCH_USERINFO_LOADING });

  try {
    const response = await api.get(`${backendUrl}/userInfo/${userId}`);
    dispatch({
      type: FETCH_USERINFO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERINFO_FAILURE,
      payload: error.message,
    });
  }
};

export const addUserInfo = (userInfo) => async (dispatch) => {
  dispatch({ type: ADD_USERINFO_LOADING });

  try {
    const response = await api.post(`${backendUrl}/userinfo`, userInfo);
    dispatch({
      type: ADD_USERINFO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USERINFO_FAILURE,
      payload: error.message,
    });
  }
};

export const updateUserInfo = (userId, updatedInfo) => async (dispatch) => {
  dispatch({ type: UPDATE_USERINFO_LOADING });

  try {
    const response = await api.put(
      `${backendUrl}/userinfo/${userId}`,
      updatedInfo
    );
    dispatch({
      type: UPDATE_USERINFO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USERINFO_FAILURE,
      payload: error.message,
    });
  }
};

export const deleteUserInfo = (userId) => async (dispatch) => {
  dispatch({ type: DELETE_USERINFO_LOADING });

  try {
    await api.delete(`${backendUrl}/userinfo/${userId}`);
    dispatch({ type: DELETE_USERINFO_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_USERINFO_FAILURE,
      payload: error.message,
    });
  }
};
