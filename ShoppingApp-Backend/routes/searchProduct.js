const express = require("express");
const searchController = require("../controllers/searchController");
const router = express.Router();
router.use(express.json());

router.route("/").get(searchController.searchProducts);

module.exports = router;
