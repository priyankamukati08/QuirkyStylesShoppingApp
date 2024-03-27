import axios from "axios";

const GET_USERCART_LOADING = "GET_USERCART_LOADING";
const GET_USERCART_SUCCESS = "GET_USERCART_SUCCESS";
const GET_USERCART_FAILURE = "GET_USERCART_FAILURE";

const ADDPRODUCT_TO_USERCART_LOADING = "ADDPRODUCT_TO_USERCART_LOADING";
const ADDPRODUCT_TO_USERCART_SUCCESS = "ADDPRODUCT_TO_USERCART_SUCCESS";
const ADDPRODUCT_TO_USERCART_FAILURE = "ADDPRODUCT_TO_USERCART_FAILURE";

const CLEAR_CART = "CLEAR_CART"; 

export const getCartByUserId = (userID) => async (dispatch) => {
  dispatch({ type: GET_USERCART_LOADING });
  try {
    const response = await axios.get(`http://localhost:3001/cart/${userID}`);
    dispatch({ type: GET_USERCART_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_USERCART_FAILURE, payload: error.message });
  }
};

export const addProductToUserCart =
  (userId, productId, quantity, size, productDescription) =>
  async (dispatch) => {
    dispatch({ type: ADDPRODUCT_TO_USERCART_LOADING });
    try {
      const response = await axios.post("http://localhost:3001/cart", {
        user_id: userId,
        product_id: productId,
        product_quantity: quantity,
        product_size: size,
        Product_Description: productDescription,
      });
      dispatch({
        type: ADDPRODUCT_TO_USERCART_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: ADDPRODUCT_TO_USERCART_FAILURE,
        payload: error.message,
      });
    }
  };

  export const clearCart = () => {
  return { type: CLEAR_CART };
};

// New action creator for deleting the cart items associated with a user ID
export const deleteCartByUserId = (userID) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/cart/${userID}`);
    dispatch(clearCart()); // After successfully deleting the cart, clear the cart in Redux store
  } catch (error) {
    console.error("Error deleting cart items", error);
  }
};

const UPDATE_USERCART = "UPDATE_USERCART";

export const updateUserCart = (updatedCart) => {
  return { type: UPDATE_USERCART, payload: updatedCart };
};