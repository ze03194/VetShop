const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController')
const db = require('../models')
const Appointments = db.appointments;


router.route('/getAllAppointments')
    .get(appointmentController.getAllAppointments)

router.route('/createAppointment')
    .post(appointmentController.createAppointment)

router.route("/updateAppointment")
    .post(appointmentController.updateAppointment)

router.route('/deleteAppointment')
    .post(appointmentController.deleteAppointment)

router.route('/findAppointmentsByUser')
    .post(appointmentController.findAppointmentsByUser)

router.route('/findAppointmentsByEmployee')
    .post(appointmentController.findAppointmentsByEmployee)
router.route('/findAppointmentById')
    .post(appointmentController.findAppointmentById)


module.exports = router