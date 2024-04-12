import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import "./index.css";
import Landing from "./Components/Landing";
import Homepage from "./Components/Homepage";
import reportWebVitals from "./reportWebVitals";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import Men from "./Components/Men";
import Women from "./Components/Women";
import Kids from "./Components/Kids";
import Beauty from "./Components/Beauty";
import HomeandLiving from "./Components/HomeandLiving";
import ProductDetailsPage from "./Components/ProductDetailsPage";
import Profile from "./Components/Profile";
import CartPage from "./Components/userCart";
import Login from "./Components/Login";
import CheckoutPage from "./Components/CheckoutPage";
import OrderSuccessPage from "./Components/OrderSuccessPage";
import WishlistPage from "./Components/Wishlist";
import UserOrdersPage from "./Components/UserOrdersPage";
import OrderdetailsPage from "./Components/OrderDetailsPage";
import TrackPackagePage from "./Components/TrackPackagePage";
import App from "./App";
import AdminPage from "./Components/AdminPage";
import ProductManagement from "./Components/ProductManagement";
import ProductQuantityManagement from "./Components/ProductQuantityManagement";

Amplify.configure(awsconfig);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/app" element={<App />} />
          <Route
            path="/Mens/:brand/:productId"
            element={<ProductDetailsPage />}
          />
          <Route
            path="/Women/:brand/:productId"
            element={<ProductDetailsPage />}
          />
          <Route
            path="/Kids/:brand/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/Mens" element={<Men />} />
          <Route path="/Women" element={<Women />} />
          <Route path="/Kids" element={<Kids />} />
          <Route path="/Home&Living" element={<HomeandLiving />} />
          <Route path="/Beauty" element={<Beauty />} />
          <Route path="/userCart" element={<CartPage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Checkout" element={<CheckoutPage />} />
          <Route path="/Order-Success" element={<OrderSuccessPage />} />
          <Route path="/Ordersdetails" element={<UserOrdersPage />} />
          <Route
            path="/Ordersdetailspage/:userId/:orderid"
            element={<OrderdetailsPage />}
          />
          <Route
            path="/TrackPackagePage/:userId/:orderid"
            element={<TrackPackagePage />}
          />
          <Route path="/WishlistPage" element={<WishlistPage />} />
          <Route path="/AdminPage" element={<AdminPage />} />
          <Route path="/ProductManagement" element={<ProductManagement />} />
          <Route
            path="/ProductQuantityManagement"
            element={<ProductQuantityManagement />}
          />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

reportWebVitals();
