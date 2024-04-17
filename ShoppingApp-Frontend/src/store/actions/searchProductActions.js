
import api from "../api";
import { backendUrl } from "../../config";

const SEARCH_PRODUCT_LOADING = "SEARCH_PRODUCT_LOADING";
const SEARCH_PRODUCT_SUCCESS = "SEARCH_PRODUCT_SUCCESS";
const SEARCH_PRODUCT_FAILURE = "SEARCH_PRODUCT_FAILURE";

export const getSearchProducts = (searchQuery) => async (dispatch) => {
  dispatch({ type: SEARCH_PRODUCT_LOADING });
  try {
    const response = await api.get(
      `${backendUrl}/search?search=${searchQuery}`
    );
    dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: SEARCH_PRODUCT_FAILURE, payload: error.message });
  }
};
