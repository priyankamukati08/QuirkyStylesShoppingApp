import axios from "axios";


const ADD_USERINFO_LOADING = "ADD_USERINFO_LOADING";
const ADD_USERINFO_SUCCESS = "ADD_USERINFO_SUCCESS";
const ADD_USERINFO_FAILURE = "ADD_USERINFO_FAILURE";

export const addUserInfo =
  (userId, productId, quantity, size) => async (dispatch) => {
    dispatch({ type: ADD_USERINFO_LOADING });
    try {
      const response = await axios.post("http://localhost:3001/userinfo", {
        user_id: userId,
        product_id: productId,
        product_quantity: quantity,
        product_size: size,
      });
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
