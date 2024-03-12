const express = require("express");

const userCartController = require("../controllers/userCartController");
const router = express.Router();
router.use(express.json());

//router.route("/").get(homepageController.getAllProducts);
router.route("/:userid").get(userCartController.getCartByUserId);
router.route("/").post(userCartController.addToCart);
//router.route("/:id").get(userCartController.getProductById);
//router.route("/:id").put(userCartController.updateProductById);
//router.route("/:id").delete(userCartController.deleteProductById);

module.exports = router;
