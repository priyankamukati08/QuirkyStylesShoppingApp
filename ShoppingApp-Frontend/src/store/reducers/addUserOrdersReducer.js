const initialState = {
  addUserOrders: [],
  loading: false,
  error: null,
};



const addUserOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USERORDERS_LOADING":
      return { ...state, loading: true };
    case "ADD_USERORDERS_SUCCESS":
      return { ...state, loading: false, addUserOrders: action.payload };
    case "ADD_USERORDERS_FAILURE":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
export default addUserOrdersReducer;
