const express = require("express");
const userInfoController = require("../controllers/userInfoController");
const router = express.Router();
router.use(express.json());

//router.route("/").get(homepageController.getAllProducts);
//router.route("/").get(userInfoController.createUser);
router.route("/").post(userInfoController.createUser);

module.exports = router;
