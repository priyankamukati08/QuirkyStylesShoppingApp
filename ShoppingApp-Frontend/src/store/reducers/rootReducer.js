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
  import productQuantityReducer from "./productQuantityReducer";
  import userOrdersByOrderIdReducer from "./userOrdersByOrderIdReducer";
  import allProductSizeQuantityReducer from "./allProductQuantityReducer";
  import updateProductDetailsReducer from "./updateProductDetailsReducer";
  import addNewProductReducer from "./addNewProductReducer";
  import userInfoReducer from "./userInfoReducer";
  import searchProductReducer from "./searchReducer";

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
    productQuantity: productQuantityReducer,
    userOrdersByOrderId: userOrdersByOrderIdReducer,
    ProductSizeQuantity: allProductSizeQuantityReducer,
    updateProductDetails: updateProductDetailsReducer,
    addNewProduct: addNewProductReducer,
    userInfoDetail: userInfoReducer,
    searchProduct: searchProductReducer,
  });

  export default rootReducer;
