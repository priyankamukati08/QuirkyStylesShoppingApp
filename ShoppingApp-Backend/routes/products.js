const express = require("express");
const productsController = require("../controllers/productsController")
const router = express.Router();
router.use(express.json());



//router.route("/").get(homepageController.getAllProducts);
router.route("/").get(productsController.getAllProducts);
router.route("/").post(productsController.addNewProduct);
router.route("/:id").get(productsController.getProductById);
router.route("/:id").put(productsController.updateProductById);
router.route("/:id").delete(productsController.deleteProductById);

module.exports = router;
