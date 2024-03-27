import { combineReducers } from "redux";
import productReducer from "./productReducer";
import productByIDReducer from "./productByIDReducer";
import userCartReducer from "./userCartReducer";
import addProductToUserCartReducer from "./addProductUserCartReducer";
import addUserInfoReducer from "./addUserInfoReducer";
import addUserOrdersReducer from "./addUserOrdersReducer";
import userOrdersReducer from "./userOrdersReducer";
import addProductsToUserWishlist from "./addProductsToUserWishlistReducer";
import userWishlistReducer from "./userWishlistReducer";
import addUserAddressReducer from "./addUserAddressReducer";
import userAddressReducer from "./userAddressReducer";
 


const rootReducer = combineReducers({
  products: productReducer,
  productbyid: productByIDReducer,
  userCart: userCartReducer,
  addProductToUserCart: addProductToUserCartReducer,
  addUserInfo: addUserInfoReducer,
  addUserOrders: addUserOrdersReducer,
  userOrders: userOrdersReducer,
  addProductsToUserWishlist: addProductsToUserWishlist,
  userWishlist: userWishlistReducer,
  addUserAddress: addUserAddressReducer,
  userAddress: userAddressReducer,
});

export default rootReducer;
