import React, {useState} from "react";
import {createAppointment} from "../../api/AppointmentService";
import {useLocation} from "react-router-dom";
import {Modal} from "bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {refreshState, selectPets, selectRefreshToken, selectUser} from "../../features/user/userSlice";
import {createMessage} from "../../features/message/messageSlice";
import MessageModal from "./MessageModals/MessageModal";
import {refreshData} from "../../api/UserService";

const AppointmentModal = () => {
    const dispatch = useDispatch();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const user = useSelector(selectUser)
    const [petIds, setPetIds] = useState([]);
    const pets = useSelector(selectPets);



    function handleSubmit() {
        let messageModal = new Modal(document.getElementById('message-modal'))

        const appointment = {
            appointmentDate: date,
            appointmentTime: time,
            userId: user.id,
            pets: petIds
        }

        createAppointment(appointment)
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
                dispatch(createMessage({
                    title: 'Appointment Scheduled',
                    body: 'Please check your email for more details.'
                }))
                messageModal.show();
            })
            .catch(error => {
                dispatch(createMessage({
                    title: 'Create Appointment Failed',
                    body: 'Please fill out all required fields.'
                }))
                messageModal.show();
            })
    }


    function handleSelector(event) {
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setPetIds(value)
    }


    const renderPets = pets?.map(pet => (
        <option value={pet.id}>{pet.firstName}</option>
    ))

    return (
        <>
            <div className="modal fade" id="appointment-modal" data-bs-backdrop="false" data-bs-keyboard="false"
                 tabIndex="-1"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title w-100" id="staticBackdropLabel">Schedule Appointment</h5>
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

                                    {renderPets?.length > 0 ? (
                                            <select className="form-select" id="selectPet" multiple size="2"
                                                    onChange={handleSelector}>
                                                <option>Select Pet(s)</option>
                                                {renderPets}
                                            </select>
                                        ) :
                                        <div className="form-control bg-danger text-light">
                                            <span>No pets associated with your account.</span> <br/>
                                            <span>Please add a pet in your profile page to schedule an appointment</span>
                                        </div>
                                    }

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
                                           onChange={(event) => setDate(event.target.value)}/>
                                </div>
                                <div>
                                    <label htmlFor="apptTime"></label>
                                    <input type="time" className="form-control" step="600" min="08:00" max="17:30"
                                           id="apptTime"
                                           onChange={(event) => setTime(event.target.value)} required/>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-backdrop="false" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button id="register-btn" onClick={handleSubmit} type="button"
                                    className="btn btn-dark"
                                    disabled={renderPets?.length <= 0}
                                    data-bs-dismiss="modal">Schedule
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <MessageModal/>
        </>

    );
}

export default AppointmentModal