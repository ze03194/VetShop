const express = require('express');
const router = express.Router();
const petController = require('../controllers/petController')
const db = require("../models");
const Pets = db.pets

router.route('/createPet')
    .post(petController.createPet)

router.route('/updatePet')
    .post(petController.updatePet)


router.route('/deletePet')
    .post(petController.deletePet)

router.route('/findPetsByOwner')
    .post(petController.findPetsByOwner)

module.exports = router