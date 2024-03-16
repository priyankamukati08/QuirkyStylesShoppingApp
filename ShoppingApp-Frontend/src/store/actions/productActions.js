import axios from "axios";


const GET_PRODUCT_LOADING = "GET_PRODUCT_LOADING";
const GET_PRODUCT_SUCCESS = "GET_PRODUCT_SUCCESS";
const GET_PRODUCT_FAILURE = "GET_PRODUCT_FAILURE";

const GET_PRODUCT_BY_ID_LOADING = "GET_PRODUCT_BY_ID_LOADING";
const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
const GET_PRODUCT_BY_ID_FAILURE = "GET_PRODUCT_BY_ID_FAILURE";


export const getProducts = () => async (dispatch) => {
  dispatch({ type: GET_PRODUCT_LOADING });
  try {
    const response = await axios.get("http://localhost:3001/products");
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
    const response = await axios.get(
      `http://localhost:3001/products/${productId}`
    );
    dispatch({ type: GET_PRODUCT_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: GET_PRODUCT_BY_ID_FAILURE, payload: error.message });
  }
};
