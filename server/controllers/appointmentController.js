const db = require('../models');
const Appointments = db.appointments;
const Users = db.users;
const Pets = db.pets;
const userController = require('./userController')
const petController = require('./petController')

const createAppointment = async (req, res) => {
    const appointment = req.body;

    for (let i = 0; i < appointment.pets.length; i++) {
        let {pets, ...newAppointment} = appointment;
        newAppointment = {...newAppointment, pet_id: pets[i]}
        await Appointments.create(newAppointment);
    }

    return res.status(200).json({"Appointment Created": appointment});
}

const updateAppointment = async (req, res) => {
    const updatedAppointment = req.body;
    const appointment = await Appointments.findByPk(updatedAppointment.id);
    await appointment.set(updatedAppointment);
    await appointment.save();

    res.status(200).json({"Appointment Updated": appointment})
}

const deleteAppointment = async (req, res) => {
    const appointment = await Appointments.findByPk(req.body.id)
    await appointment.destroy();

    return res.status(200).json({"Deleted Appointment": appointment});
}

const findAppointmentsByUser = async (req, res) => {
    const listOfAppointments = await Appointments.findAll({
        where: {
            user_id: req.body.user_id
        }
    });

    return res.status(200).json(listOfAppointments);
}

const findAppointmentById = async (req, res) => {
    const id = req.body.id
    const appointment = await Appointments.findByPk(id)

    return res.status(200).json(appointment)
}

const findAppointmentsByEmployee = async (req, res) => {
    const listOfAppointments = await Appointments.findAll({
        where: {
            employee_id: req.body.employee_id
        }
    })

    return res.status(200).json(listOfAppointments);
}

const getAllAppointments = async (req, res) => {
    const listOfAppointments = await Appointments.findAll();

    return res.status(200).json(listOfAppointments);
}

module.exports = {
    createAppointment,
    updateAppointment,
    deleteAppointment,
    findAppointmentsByUser,
    findAppointmentsByEmployee,
    findAppointmentById,
    getAllAppointments
}