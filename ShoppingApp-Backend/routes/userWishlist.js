const express = require("express");
const userWishlistController = require("../controllers/userWishlistController");
const router = express.Router();
router.use(express.json());

router.route("/:userid").get(userWishlistController.getWishlistItemsByUserId);
router.route("/").post(userWishlistController.addToWishlist);
router
  .route("/:userid/:productid")
  .delete(userWishlistController.removeFromWishlist);

module.exports = router;
