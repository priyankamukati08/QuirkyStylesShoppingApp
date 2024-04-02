const express = require("express");
const userAddressController = require("../controllers/userAddressController");
const router = express.Router();
router.use(express.json());

//router.route("/").get(homepageController.getAllProducts);
router.route("/:userid").get(userAddressController.getUserAddresses);
router.route("/").post(userAddressController.addUserAddress);
router
  .route("/:userId/:addressId")
  .put(userAddressController.updateUserAddress);
router
  .route("/:userId/:addressId")
  .delete(userAddressController.deleteUserAddress);

module.exports = router;
