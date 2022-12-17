const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const verifyJWT = require('../middleware/verifyJWT')

router.route('/getAllUsers')
    .get(verifyJWT, userController.getAllUsers);

router.route('/findUserById')
    .post(userController.findUserById);

router.route('/registerUser')
    .post(userController.createUser);

router.route('/updateUser')
    .post(userController.updateUser);

router.route('/deleteUser')
    .post(userController.deleteUser);

router.route('/findUserByToken')
    .post(userController.findUserByToken)

router.route('/refreshData')
    .post(userController.refreshData)

router.route('/checkIfEmailExists')
    .post(userController.checkIfEmailExists)

module.exports = router