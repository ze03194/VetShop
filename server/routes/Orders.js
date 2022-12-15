const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

router.route('/createOrder')
    .post(orderController.createOrder);

router.route('/updateOrder')
    .post(orderController.updateOrder);

router.route('/deleteOrder')
    .post(orderController.deleteOrder)

router.route('/findOrderById')
    .post(orderController.findOrderById)

router.route('/findOrdersByUserId')
    .post(orderController.findOrdersByUserId)

module.exports = router