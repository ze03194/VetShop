const express = require('express');
const router = express.Router();
const refreshController = require('../controllers/refreshTokenController')

router.route("/")
    .post(refreshController.handleRefreshToken)

module.exports = router
