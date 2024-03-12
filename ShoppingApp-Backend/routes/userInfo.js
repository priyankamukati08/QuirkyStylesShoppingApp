const express = require("express");
const homepageController = require("../controllers/homepageController");
const router = express.Router();



router.route("/products").get(homepageController.getAllProducts);

module.exports = router;
