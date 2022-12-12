const express = require("express");
const router = express.Router();
const employeeController = require('../controllers/employeeController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/findEmployeeById')
    .post(employeeController.findEmployeeById)

router.route('/createEmployee')
    .post(employeeController.createEmployee)

router.route('/updateEmployee')
    .post(employeeController.updateEmployee)

router.route('/deleteEmployee')
    .post(employeeController.deleteEmployee)

router.route('/getAllEmployees')
    .get(employeeController.getAllEmployees)

module.exports = router