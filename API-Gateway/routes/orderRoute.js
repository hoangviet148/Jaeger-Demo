const express = require("express");
const router = express.Router();

const controller = require("../controllers/orderController");

router
    .route("/getOrderByUserId/:userId")
    .get(controller.getOrderByUserId);

router
    .route("/getAllOrder")
    .get(controller.getAllOrder);

router
    .route("/createOrder")
    .post(controller.createOrder);

module.exports = router;