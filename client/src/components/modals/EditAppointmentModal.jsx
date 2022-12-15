import React, {useEffect, useState} from "react";
import {updateAppointment} from "../../api/AppointmentService";
import {useLocation, useNavigate} from "react-router-dom";

const EditAppointmentModal = (appointmentInfo) => {
    const navigate = useNavigate();
    const location = useLocation()
    const [appointment, setAppointment] = useState({});
    const [user, setUser] = useState({});
    const [userFound, setUserFound] = useState(false);
    const [appointmentFound, setAppointmentFound] = useState(false);
    const [pets, setPets] = useState([]);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [aptEdited, setAptEdited] = useState(false);

    useEffect(() => {
        if (Object.keys(appointmentInfo.value.user).length !== 0) {
            setUser(appointmentInfo.value.user)
            setUserFound(true);
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
    })


    function handleSelector(event) {
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setPets(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedAppointment = {
            id: appointment.id,
            appointmentDate: appointment.appointmentDate,
            appointmentTime: appointment.appointmentTime,
            userId: user.id,
            pets: pets
        }

        updateAppointment(updatedAppointment)
            .then((response) => {
                console.log(response.data)

            })
            .catch(error => {
                setAptEdited(false)
                console.log(error)
            })

        console.log(JSON.stringify(location))
        console.log(JSON.stringify(location))

        navigate("/", {state: {from: '/profile'}})

        // navigate("/profile")

    }


    return (
        <div className="modal fade " id="edit-appointment-modal" data-bs-backdrop="false"
             data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog ">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="staticBackdropLabel">Edit Appointment</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="appointment-form">
                            <div className="d-flex ">
                                <label htmlFor="first-name"></label>
                                <input type="text" className="form-control me-2" id="first-name"
                                       placeholder={user.firstName}
                                       disabled
                                />
                                <label htmlFor="last-name"></label>
                                <input type="text" className="form-control" id="last-name"
                                       placeholder={user.lastName}
                                       disabled
                                />
                            </div>
                            <div className="mb-sm-0">
                                <label htmlFor="email"></label>
                                <input type="text" className="form-control" id="email"
                                       placeholder={user.email}
                                       disabled
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="petName"></label>
                                <select className="form-select" id="selectPet" multiple size="2"
                                        onChange={handleSelector}>
                                    <option>Select Pet(s)</option>
                                    {user?.Pets?.map(({firstName}) => (
                                        <option value={firstName}>{firstName}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="mb-0">
                                <label htmlFor="phoneNumber"></label>
                                <input type="text" className="form-control" id="phoneNumber"
                                       placeholder={user.phoneNumber}
                                       disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="apptDate"></label>
                                <input type="date" className="form-control" id="apptDate"
                                       placeholder="Date"
                                       defaultValue={appointment.appointmentDate}
                                       value={appointment.appointmentDate}
                                    // onChange={(event) => setDate(event.target.value)}
                                       onChange={(event) => {
                                           appointment.appointmentDate = event.target.value
                                       }}
                                />
                            </div>
                            <div>
                                <label htmlFor="apptTime"></label>
                                <input type="time" className="form-control" step="600" min="08:00" max="17:30"
                                       id="apptTime"
                                       defaultValue={appointment.appointmentTime}
                                    // onChange={(event) => setTime(event.target.value)}
                                       onChange={(event) => {
                                           appointment.appointmentTime = event.target.value
                                       }}
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
                                className="btn btn-dark"
                                data-bs-dismiss="modal">Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditAppointmentModal