const express = require("express");
const productsController = require("../controllers/productsController");
const router = express.Router();

//* param middleware
// here we specify first the parameter that we actually want to search for, so basically the parameter for which this middleware is gonna run
router.param("id", productsController.checkID);

router
  .route("/")
  .get(productsController.getAllProducts)
  .post(productsController.checkBody, productsController.createProduct); // check body before create product

router
  .route("/:id")
  .get(productsController.getProduct)
  .patch(productsController.updateProduct)
  .delete(productsController.deleteProduct);

module.exports = router;

// if i make it like   exports = router. i will get Error
// because it will be exported as an object , and app.use  in app.js is waiting for middleware function
