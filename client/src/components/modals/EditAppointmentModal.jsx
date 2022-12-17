import React, {useEffect, useState} from "react";
import {updateAppointment} from "../../api/AppointmentService";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {createMessage} from "../../features/message/messageSlice";
import {refreshState, selectPets, selectUser} from "../../features/user/userSlice";
import {refreshData} from "../../api/UserService";
import {clearAppointment, selectAppointment} from "../../features/appointment/appointmentSlice";
import MessageModal from "./MessageModals/MessageModal";
import {Modal} from "bootstrap";

const EditAppointmentModal = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation()
    const returnedAppointment = useSelector(selectAppointment)
    const user = useSelector(selectUser)
    const [pets, setPets] = useState([]);
    const allPets = useSelector(selectPets);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {

    }, [returnedAppointment])

    function handleSelector(event) {
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setPets(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let messageModal = new Modal(document.getElementById('message-modal'))

        const updatedAppointment = {
            id: returnedAppointment.id,
            appointmentDate: date ? date : returnedAppointment.appointmentDate,
            appointmentTime: time ? time : returnedAppointment.appointmentTime,
            userId: returnedAppointment.userId,
            pets: pets
        }

        updateAppointment(updatedAppointment)
            .then((response) => {
                refreshData(user.id)
                    .then(response => {
                        dispatch(refreshState({
                            pets: response.data.pets,
                            appointments: response.data.appointments
                        }))
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                dispatch(createMessage({
                    title: 'Update Appointment Failed',
                    body: 'Internal server error.'
                }))
                messageModal.show()

                console.log(error)
            })

        dispatch(clearAppointment())

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
                                       placeholder={user?.firstName}
                                       disabled
                                />
                                <label htmlFor="last-name"></label>
                                <input type="text" className="form-control" id="last-name"
                                       placeholder={user?.lastName}
                                       disabled
                                />
                            </div>
                            <div className="mb-sm-0">
                                <label htmlFor="email"></label>
                                <input type="text" className="form-control" id="email"
                                       placeholder={user?.email}
                                       disabled
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="petName"></label>
                                <select className="form-select" id="selectPet" multiple size="2"
                                        onChange={handleSelector}>
                                    <option>Select Pet(s)</option>
                                    {allPets?.map(({firstName}) => (
                                        <option value={firstName}>{firstName}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="mb-0">
                                <label htmlFor="phoneNumber"></label>
                                <input type="text" className="form-control" id="phoneNumber"
                                       placeholder={user?.phoneNumber}
                                       disabled
                                />
                            </div>
                            <div>
                                <label htmlFor="apptDate"></label>
                                <input type="date" className="form-control" id="apptDate"
                                       placeholder="Date"
                                       value={date ? date : returnedAppointment?.appointmentDate ? returnedAppointment.appointmentDate : ''}
                                       onChange={(event) => {
                                           setDate(event.target.value)
                                       }}
                                />
                            </div>
                            <div>
                                <label htmlFor="apptTime"></label>
                                <input type="time" className="form-control" step="600" min="08:00" max="17:30"
                                       id="apptTime"
                                       defaultValue={time ? time : returnedAppointment?.appointmentTime}
                                       onChange={(event) => {
                                           setTime(event.target.value)
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
            <MessageModal/>
        </div>
    );
}

export default EditAppointmentModal