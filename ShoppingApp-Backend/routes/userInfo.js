const express = require("express");
const userInfoController = require("../controllers/userInfoController");
const router = express.Router();
router.use(express.json());

//router.route("/").get(homepageController.getAllProducts);

router.route("/").post(userInfoController.addUserInfo);
router.route("/:userid").get(userInfoController.getUserInfo);
router.route("/:userid").put(userInfoController.updateUserInfo);


module.exports = router;
