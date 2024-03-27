const express = require("express");

const userCartController = require("../controllers/userCartController");
const router = express.Router();
router.use(express.json());

router.route("/:userid").get(userCartController.getCartByUserId);
router.route("/").post(userCartController.addToCart);
router.delete("/:userid", userCartController.deleteCartByUserId);


module.exports = router;
