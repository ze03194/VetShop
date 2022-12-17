import React, {useState} from "react";
import {deleteAppointment} from "../../api/AppointmentService";
import {useNavigate} from "react-router-dom";
import {refreshData} from "../../api/UserService";
import {refreshState, selectUser} from "../../features/user/userSlice";
import {useDispatch, useSelector} from "react-redux";
import {clearAppointment, selectAppointment} from "../../features/appointment/appointmentSlice";

const DeleteAppointmentModal = (appointmentInfo) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const returnedAppointment = useSelector(selectAppointment);


    const handleSubmit = async (e) => {
        e.preventDefault();

        deleteAppointment(returnedAppointment.id)
            .then(response => {
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
                console.log(error)
            })

        dispatch(clearAppointment());
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
                            {/*<div className="mb-0">*/}
                            {/*    <label></label>*/}
                            {/*    <select className="form-select" id="selectPet" multiple size="2"*/}
                            {/*            disabled>*/}
                            {/*        <option>Select Pet(s)</option>*/}
                            {/*        {user?.Pets?.map(({firstName}) => (*/}
                            {/*            <option value={firstName}>{firstName}</option>*/}
                            {/*        ))}*/}
                            {/*    </select>*/}

                            {/*</div>*/}
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
                                       defaultValue={returnedAppointment.appointmentDate}
                                       disabled
                                    // onChange={(event) => setDate(event.target.value)}
                                />
                            </div>
                            <div>
                                <label></label>
                                <input type="time" className="form-control" step="600" min="08:00" max="17:30"
                                       id="apptTime"
                                       defaultValue={returnedAppointment.appointmentTime}
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
                                className="btn btn-dark"
                                data-bs-dismiss="modal">Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteAppointmentModal