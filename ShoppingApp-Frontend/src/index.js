import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import store from "./store/store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
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
          <Route path="/Mens" element={<Men />} />
          <Route path="/Women" element={<Women />} />
          <Route path="/Kids" element={<Kids />} />
          <Route path="/Home&Living" element={<HomeandLiving />} />
          <Route path="/Beauty" element={<Beauty />} />
          <Route path="/userCart/:userId" element={<CartPage />} />
          <Route
            path="/Mens/:brand/:productId"
            element={<ProductDetailsPage />}
          />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
