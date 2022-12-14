import React, {useEffect, useState} from "react";
import {deleteAppointment} from "../../api/AppointmentService";

const DeleteAppointmentModal = (appointmentInfo) => {
    const [appointment, setAppointment] = useState({});
    const [user, setUser] = useState({});
    const [aptDeleted, setAptDeleted] = useState(false);

    useEffect(() => {

        if (Object.keys(appointmentInfo.value.user).length !== 0) {
            setUser(appointmentInfo.value.user)
        }

        if (Object.keys(appointmentInfo.value.appointment).length !== 0) {
            appointmentInfo.value.appointment.appointmentDate = new Date(Date.parse(appointmentInfo.value.appointment.appointmentDate))
                .toISOString().split('T')[0]

            let [time, modifier] = appointmentInfo.value.appointment.appointmentTime.split(' ');
            let [hours, minutes] = time.split(':')

            if (hours === '12') {
                hours = '00';
            }
            if (modifier === 'PM' || modifier === 'pm') {
                hours = parseInt(hours, 10) + 12;
            }
            appointmentInfo.value.appointment.appointmentTime = hours + ':' + minutes

            setAppointment(appointmentInfo.value.appointment)

        }
    }, [aptDeleted])


    function handleSubmit() {
        deleteAppointment(appointment.id)
            .then(response => {
                console.log(response)
                setAptDeleted(true)
            })
            .catch(error => {
                console.log(error)
                setAptDeleted(false)
            })
    }

    return (
        <div className="modal fade" id="delete-appointment-modal" data-bs-backdrop="false" data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="staticBackdropLabel">Delete Appointment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="appointment-form">
                            <div className="d-flex ">
                                <label></label>
                                <input type="text" className="form-control me-2"
                                       placeholder={user.firstName}
                                       disabled
                                />
                                <label></label>
                                <input type="text" className="form-control"
                                       placeholder={user.lastName}
                                       disabled
                                />
                            </div>
                            <div className="mb-sm-0">
                                <label></label>
                                <input type="text" className="form-control"
                                       placeholder={user.email}
                                       disabled
                                />
                            </div>
                            <div className="mb-0">
                                <label></label>
                                <select className="form-select" id="selectPet" multiple size="2"
                                        disabled>
                                    <option>Select Pet(s)</option>
                                    {user?.Pets?.map(({firstName}) => (
                                        <option value={firstName}>{firstName}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="mb-0">
                                <label></label>
                                <input type="text" className="form-control"
                                       placeholder={user.phoneNumber}
                                       disabled
                                />
                            </div>
                            <div>
                                <label></label>
                                <input type="date" className="form-control"
                                       placeholder="Date"
                                       defaultValue={appointment.appointmentDate}
                                       disabled
                                    // onChange={(event) => setDate(event.target.value)}
                                />
                            </div>
                            <div>
                                <label></label>
                                <input type="time" className="form-control" step="600" min="08:00" max="17:30"
                                       id="apptTime"
                                       defaultValue={appointment.appointmentTime}
                                       disabled
                                    // onChange={(event) => setTime(event.target.value)}
                                       required
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-backdrop="false" data-bs-dismiss="modal">Cancel
                        </button>
                        <button id="update-appt-btn"
                                onClick={handleSubmit}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal">Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAppointmentModal