const express = require("express");
const router = express.Router();

const controller = require("./productController");

router
    .route("/createProduct")
    .post(controller.createProduct);

router
    .route("/getProductById/:productId")
    .get(controller.getProductById);

router
    .route("/getAllProduct")
    .get(controller.getAllProduct);

module.exports = router;