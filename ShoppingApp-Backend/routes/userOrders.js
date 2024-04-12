const express = require("express");
const userOrdersController = require("../controllers/userOrdersController");
const router = express.Router();
router.use(express.json());

router.route("/:userid").get(userOrdersController.getAllUserOrders);
router
  .route("/:userid/:orderid")
  .get(userOrdersController.getUserOrdersByUserIdAndOrderId);
router.route("/").post(userOrdersController.createUserOrder);
router.route("/:id").put(userOrdersController.updateUserOrder);
router.route("/:id").delete(userOrdersController.deleteUserOrder);

module.exports = router;
    