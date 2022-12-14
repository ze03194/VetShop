import axios from "axios";

const localHostURL = "http://localhost:8080"

const AppointmentService = () => {

}
const createAppointment = (appointmentInfo) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/appointments/createAppointment',
        headers: {},
        data: {
            appointmentDate: appointmentInfo.appointmentDate,
            appointmentTime: appointmentInfo.appointmentTime,
            user_id: appointmentInfo.userId,
            pets: appointmentInfo.pets,
        }
    })
}

const updateAppointment = (appointmentInfo) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/appointments/updateAppointment',
        headers: {},
        data: {
            id: appointmentInfo.id,
            appointmentDate: appointmentInfo.appointmentDate,
            appointmentTime: appointmentInfo.appointmentTime,
            user_id: appointmentInfo.userId,
            pets: appointmentInfo.pets,
        }
    })
}

const findAppointmentsByUser = (user_id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/appointments/findAppointmentsByUser',
        headers: {},
        data: {
            user_id: user_id
        }
    })
}

const deleteAppointment = (id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/appointments/deleteAppointment',
        headers: {},
        data: {
            id: id
        }
    })
}

const findAppointmentById = async (id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/appointments/findAppointmentById',
        headers: {},
        data: {
            id: id
        }
    })
}


export {createAppointment, updateAppointment, findAppointmentsByUser, findAppointmentById, deleteAppointment}

export default AppointmentService