const express = require("express");
const productQuantitybyAdminController = require("../controllers/productQuantityController");
const router = express.Router();
router.use(express.json());

router
  .route("/:productId/:size")
  .post(productQuantitybyAdminController.addProductSizeAndColor);
router
  .route("/:productId/:size")
  .put(
    productQuantitybyAdminController.updateProductSizeAndColorQuantityByAdmin
  );

module.exports = router;
