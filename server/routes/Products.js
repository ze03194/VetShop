const express = require('express')
const router = express.Router();
const productController = require('../controllers/productController')
const {updateProduct} = require("../controllers/productController");

router.route('/createProduct')
    .post(productController.createProduct);

router.route('/updateProduct')
    .post(productController.updateProduct);

router.route('/deleteProduct')
    .post(productController.deleteProduct);

router.route('/findProductById')
    .post(productController.findProductById);

router.route('/getAllProducts')
    .get(productController.getAllProducts);

module.exports = router