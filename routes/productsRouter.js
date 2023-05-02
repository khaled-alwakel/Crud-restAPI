const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.createProduct); // check body before create product

router
  .route("/:id")
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;

//  exports = router => Error, because it will be exported as an object , and app.use  in app.js is waiting for middleware function
