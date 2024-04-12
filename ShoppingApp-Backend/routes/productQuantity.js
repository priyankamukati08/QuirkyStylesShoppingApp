const express = require("express");
const productQuantityController = require("../controllers/productQuantityController");
const router = express.Router();
router.use(express.json());

router
  .route("/:productId")
  .get(productQuantityController.getProductSizesAndQuantities);
  router
    .route("/")
    .get(productQuantityController.getAllProductSizesAndQuantities);
router
  .route("/:productId")
  .post(productQuantityController.addProductSizeAndColor);
router
  .route("/:productId/:size/")
  .put(productQuantityController.updateProductSizeAndColorQuantity);


module.exports = router;
