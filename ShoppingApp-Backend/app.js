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
const jwt = require("jsonwebtoken");

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Middleware function to verify ID token
async function verifyIdToken(req, res, next) {
  const idToken = req.headers.authorization; // Extract ID token from request header
  const decodedToken = jwt.decode(idToken);

  if (decodedToken) {
    // Token decoded successfully
    req.user = decodedToken;
  } else {
    // Token decoding failed
    console.error("Failed to decode token");
    return res.status(401).json({ error: "Unauthorized" }); // Add return statement here
  }

  next();
}

//app.use(helmet());

const productImagesPath = path.join(__dirname, "productImages");
app.use("/productImages", express.static(productImagesPath));
app.use("/", verifyIdToken);
// Routes
app.use("/products", productRouter);
app.use("/cart", userCartRouter);
app.use("/userWishlist", userWishlistRouter);
app.use("/userInfo", userInfoRouter);
app.use("/userAddress", userAddressRouter);
app.use("/userOrders", userOrdersRouter);
app.use("/productQuantity", productQuantitysRouter);

module.exports = app;
