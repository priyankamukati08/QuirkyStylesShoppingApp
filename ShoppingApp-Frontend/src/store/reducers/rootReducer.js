import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productByIDReducer from "./productByIDReducer";
import userCartReducer from "./userCartReducer";
import addProductToUserCartReducer from "./addProductUserCartReducer";
import addUserInfoReducer from "./addUserInfoReducer";

const rootReducer = combineReducers({
  products: productReducer,
  productbyid: productByIDReducer,
  userCart: userCartReducer,
  addProductToUserCart: addProductToUserCartReducer,
  addUserInfo: addUserInfoReducer,
});

export default rootReducer;
