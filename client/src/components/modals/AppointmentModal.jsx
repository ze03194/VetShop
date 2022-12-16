import React, {useEffect, useState} from "react";
import UserService from "../../api/UserService";
import {createAppointment} from "../../api/AppointmentService";
import {useLocation, useNavigate} from "react-router-dom";
import {Modal} from "bootstrap";
import {useSelector} from "react-redux";
import {selectPets, selectRefreshToken} from "../../features/user/userSlice";

const AppointmentModal = () => {
    const location = useLocation();
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [user, setUser] = useState({});
    const [petIds, setPetIds] = useState([]);
    const [allPets, setAllPets] = useState({});
    const pets = useSelector(selectPets);
    const [userFound, setUserFound] = useState(false);
    const navigate = useNavigate();
    const token = useSelector(selectRefreshToken)

    useEffect(() => {

            let select = document.getElementById('selectPet');
            let options = []
            for (let i = 0; i < allPets?.length; i++) {
                console.log(allPets[i].firstName)
                options.push(allPets[i].firstName)
                let el = document.createElement('option');
                el.textContent = options[i];
                el.value = allPets[i].id;
                select.appendChild(el)
            }

            async function fetchData() {
                const response = await UserService(token)
                    .then((response) => {
                        setUser(response.data)
                        setUserFound(true)
                    })
                    .catch(error => {
                        setUserFound(false)
                    })

            }

            fetchData()
                .then(() => {
                    let select = document.getElementById('selectPet');
                    let options = []
                    for (let i = 0; i < user?.Pets?.length; i++) {
                        options.push(user.Pets[i].firstName)
                        let el = document.createElement('option');
                        el.textContent = options[i];
                        el.value = user.Pets[i].id;
                        select.appendChild(el)
                    }

                })

            if (location.pathname === '/appointment') {
                let myModal = new Modal(document.getElementById('appointment-modal'))
                myModal.show()
            }


        }
        ,
        [userFound]
    )

    function handleSubmit() {

        const appointment = {
            appointmentDate: date,
            appointmentTime: time,
            userId: user.id,
            pets: petIds
        }


        createAppointment(appointment)
            .then((response) => {
                // console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        navigate("/", {state: {from: '/profile'}})
    }

    function handleSelector(event) {
        let value = Array.from(event.target.selectedOptions, option => option.value);
        setPetIds(value)
    }

    const handleCancel = () => {
        // setNavigating(true)
        // navigate(-1, {replace: true})
        navigate("/", {state: {from: '/profile'}})
        // navigate("/profile", {replace: true})
    }

    const renderPets = pets.map(pet => (
        <option value={pet.id}>{pet.firstName}</option>
    ))

    return (
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
                                    {renderPets}
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
                        {/*<Link to={"/"}>*/}
                        <button type="button" className="btn btn-secondary"
                                data-backdrop="false" data-bs-dismiss="modal"
                                onClick={handleCancel}>
                            Cancel
                        </button>
                        {/*</Link>*/}
                        <button id="register-btn" onClick={handleSubmit} type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal">Schedule
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AppointmentModal