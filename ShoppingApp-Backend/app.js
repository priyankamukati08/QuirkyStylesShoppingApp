const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");

const productRouter = require("./routes/products");
const userCartRouter = require("./routes/userCart");
const userWishlistRouter = require("./routes/userWishlist");
const userInfoRouter = require("./routes/userInfo");
const userOrdersRouter = require("./routes/userOrders");
const userAddressRouter = require("./routes/userAddress");
const productQuantitysRouter = require("./routes/productQuantity");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//app.use(helmet());


const productImagesPath = path.join(__dirname, "productImages");
app.use("/productImages", express.static(productImagesPath));

// Routes
app.use("/products", productRouter);
app.use("/cart", userCartRouter);
app.use("/userWishlist", userWishlistRouter);
app.use("/userInfo", userInfoRouter);
app.use("/userAddress", userAddressRouter);
app.use("/userOrders", userOrdersRouter);
app.use("/productQuantity", productQuantitysRouter);

module.exports = app;
