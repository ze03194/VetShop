import React, {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import '../CustomStyles.css'
import {useDispatch, useSelector} from "react-redux";
import LoggedInNavComponent from "../NavComponent/LoggedInNavComponent";
import NavComponent from "../NavComponent/NavComponent";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import EditAppointmentModal from "../modals/EditAppointmentModal";
import DeleteAppointmentModal from "../modals/DeleteAppointmentModal";
import EditPetModal from "../modals/EditPetModal";
import DeletePetModal from "../modals/DeletePetModal";
import AppointmentModal from "../modals/AppointmentModal";
import {refreshState, selectAppointments, selectPets, selectUser} from "../../features/user/userSlice";
import {refreshData} from "../../api/UserService";
import PetModal from "../modals/PetModal";
// import {selectAllAppointments} from "../../features/appointments/appointmentSlice";

const ProfilePage = () => {
    const {auth} = useAuth();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    // const [allAppointments, setAllAppointments] = useSelector(selectAppointments)
    // const [allPets, setAllPets] = useSelector(selectPets)
    const [appointment, setAppointment] = useState({})
    const [pet, setPet] = useState({})

    const allAppointments = useSelector(selectAppointments)
    const allPets = useSelector(selectPets)

    useEffect(() => {
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
    }, [])


    const handleEditAppointment = (id, userId, petId, appointmentDate, appointmentTime) => {

        const apptInfo = {
            id: id,
            userId: userId,
            petId: petId,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
        }
        setAppointment(apptInfo)
    }


    const handleEditPet = (id, animalType, breed, firstName, lastName, age, weight, user_id) => {
        const petInfo = {
            id: id,
            animalType: animalType,
            breed: breed,
            firstName: firstName,
            lastName: lastName,
            age: age,
            weight: weight,
            user_id: user_id
        }
        setPet(petInfo)
    }

    const handleDeletePet = (id, animalType, breed, firstName, lastName, age, weight, user_id) => {
        const petInfo = {
            id: id,
            animalType: animalType,
            breed: breed,
            firstName: firstName,
            lastName: lastName,
            age: age,
            weight: weight,
            user_id: user_id
        }
        setPet(petInfo)
    }


    const handleAddAppointment = () => {
        // let testing = new Modal(document.getElementById('appointment-modal'))
        // testing.show()

    }

    function handleDeleteAppointment(id, user_id, pet_id, appointmentDate, appointmentTime) {
        const apptInfo = {
            id: id,
            userId: user_id,
            petId: pet_id,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
        }

        setAppointment(apptInfo)

    }

    function convertTime(appointmentTime) {
        let [time, modifier] = appointmentTime.split(' ');
        let [hours, minutes] = time.split(':')
        let amOrPm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;

        return hours + ':' + minutes + ' ' + amOrPm
    }

    function convertDate(appointmentDate) {
        const [year, month, day] = appointmentDate.split('-');
        return month + '/' + day + '/' + year
    }

    return (
        <>
            {auth?.email
                ? <LoggedInNavComponent/>
                : <NavComponent/>}
            <div className="container-fluid d-flex flex-column p-3">
                <h3 className="align-self-end me-5">Welcome {user.firstName}</h3>

                <div className="container d-flex flex-column">


                    <h2 className="text-center mt-5">My Appointments</h2>
                    <div
                        className="position-relative row row-cols-1 row-cols-md-3 mt-4 bg-dark bg-gradient rounded-4 custom-shadow">
                        <Link
                            className="position-absolute nav-link end-0 text-end text-light me-5 mt-3 cspw"
                            data-bs-toggle="modal" data-bs-target="#appointment-modal"
                            onClick={handleAddAppointment}>
                            <FontAwesomeIcon icon={faPlus} className="fa-2x "/>
                        </Link>
                        {allAppointments.map(({id, appointmentDate, appointmentTime, user_id, pet_id}) => (
                            <div className="col mb-2 mt-5" key={id}>
                                {/*<div className="card-body mt-3 ">*/}
                                <div className="card border mb-3 mt-3 rounded-4">
                                    <div className="card-body bg-light rounded-4">
                                        <h6 className="card-title text-center mb-3">Appointment ID: {id}</h6>

                                        <p className="card-text mt-4 text-center">Date: {convertDate(appointmentDate)}</p>

                                        <p className="card-text text-center">Time: {convertTime(appointmentTime)}</p>
                                        <div className="d-flex justify-content-center mt-5">
                                            <Link
                                                className="nav-link active border border-dark w-25 text-center p-1 rounded-3 me-2"
                                                id="please-work"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit-appointment-modal"
                                                onClick={() =>
                                                    handleEditAppointment(id, user_id, pet_id, appointmentDate, appointmentTime)}>Edit</Link>
                                            <Link
                                                className="nav-link active border border-dark w-25 text-center p-1 rounded-3"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete-appointment-modal"
                                                onClick={() => handleDeleteAppointment(id, user_id, pet_id, appointmentDate, appointmentTime)}
                                            >Cancel
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                                {/*</div>*/}
                            </div>
                        ))}

                    </div>

                </div>


                <div className="container d-flex flex-column">
                    <h2 className="text-center mt-5">My Pets</h2>


                    <div
                        className="position-relative row row-cols-1 row-cols-md-3 mt-4 bg-dark bg-gradient rounded-4 custom-shadow">
                        <Link className="position-absolute nav-link end-0 text-end text-light me-5 mt-3 cspw"
                              data-bs-toggle="modal" data-bs-target="#pet-modal">
                            <FontAwesomeIcon icon={faPlus} className="fa-2x "/>
                        </Link>
                        {allPets.map(({id, animalType, breed, firstName, lastName, age, weight, user_id}) => (
                            <div className="col mb-4 mt-5">
                                {/*<div className="card-body mt-3 ">*/}
                                <div className="card mt-3 mb-3 rounded-4">
                                    <div className="card-body bg-light rounded-4">
                                        <h6 className="card-title text-center mb-3">{firstName}</h6>
                                        <p className="card-text mt-4 text-center">Pet type: {animalType}</p>
                                        <p className="card-text text-center">Pet breed: {breed}</p>
                                        <p className="card-text text-center">Pet age: {age}</p>
                                        <p className="card-text text-center">Pet weight: {weight}</p>
                                        <div className="d-flex justify-content-center">
                                            <Link
                                                className="nav-link active border border-dark w-25 text-center p-1 rounded-3 me-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit-pet-modal"
                                                onClick={() => {
                                                    handleEditPet(id, animalType, breed, firstName, lastName, age, weight, user_id)
                                                }}>Edit</Link>
                                            <Link
                                                className="nav-link active border border-dark w-25 text-center p-1 rounded-3"
                                                data-bs-toggle="modal"
                                                data-bs-target="#delete-pet-modal"
                                                onClick={() => {
                                                    handleDeletePet(id, animalType, breed, firstName, lastName, age, weight, user_id)
                                                }}
                                            >Delete</Link>
                                        </div>

                                    </div>
                                </div>
                                {/*</div>*/}
                            </div>
                        ))}


                    </div>

                </div>
            </div>
            <EditAppointmentModal value={{appointment, user}}/>
            <DeleteAppointmentModal value={{appointment, user}}/>
            <EditPetModal value={{pet}}/>
            <DeletePetModal value={{pet}}/>
            <AppointmentModal value={allPets}/>
            <PetModal/>
        </>
    );
}

export default ProfilePage