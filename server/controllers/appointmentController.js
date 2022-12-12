const db = require('../models');
const Appointments = db.appointments;

const createAppointment = async (req, res) => {
    const appointment = req.body;
    await Appointments.create(appointment);

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
    getAllAppointments
}