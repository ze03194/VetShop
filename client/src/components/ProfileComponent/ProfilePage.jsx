import React from "react";
import useAuth from "../../hooks/useAuth";
import '../CustomStyles.css'
import {useDispatch, useSelector} from "react-redux";
import LoggedInNavComponent from "../NavComponent/LoggedInNavComponent";
import NavComponent from "../NavComponent/NavComponent";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import EditPetModal from "../modals/EditPetModal";
import AppointmentModal from "../modals/AppointmentModal";
import {selectAppointments, selectPets, selectUser} from "../../features/user/userSlice";
import PetModal from "../modals/PetModal";
import {setAppointment} from "../../features/appointment/appointmentSlice";
import EditAppointmentModal from "../modals/EditAppointmentModal";
import {setPet} from "../../features/pet/petSlice";
import DeleteAppointmentModal from "../modals/DeleteAppointmentModal";
import DeletePetModal from "../modals/DeletePetModal";

const ProfilePage = () => {
    const {auth} = useAuth();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const allAppointments = useSelector(selectAppointments)
    const allPets = useSelector(selectPets)


    const handleEditAppointment = (id, userId, petId, appointmentDate, appointmentTime) => {
        dispatch(setAppointment({
            id: id,
            userId: userId,
            petId: petId,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
        }))

    }

    const handleEditPet = (id, animalType, breed, firstName, lastName, age, weight, userId) => {
        dispatch(setPet({
            id: id,
            animalType: animalType,
            breed: breed,
            firstName: firstName,
            lastName: lastName,
            age: age,
            weight: weight,
            user_id: userId
        }))

    }

    const handleDeletePet = (id, animalType, breed, firstName, lastName, age, weight, userId) => {
        dispatch(setPet({
            id: id,
            animalType: animalType,
            breed: breed,
            firstName: firstName,
            lastName: lastName,
            age: age,
            weight: weight,
            user_id: userId
        }))

    }


    function handleDeleteAppointment(id, userId, petId, appointmentDate, appointmentTime) {
        dispatch(setAppointment({
            id: id,
            userId: userId,
            petId: petId,
            appointmentDate: appointmentDate,
            appointmentTime: appointmentTime,
        }))
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
                            data-bs-toggle="modal" data-bs-target="#appointment-modal">
                            <FontAwesomeIcon icon={faPlus} className="fa-2x "/>
                        </Link>

                        {allAppointments.length > 0 ? (
                                <>
                                    {allAppointments.map(({id, appointmentDate, appointmentTime, userId, petId}) => (
                                        <div className="col mb-2 mt-5" key={id}>
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
                                                                handleEditAppointment(id, userId, petId, appointmentDate, appointmentTime)}>Edit</Link>
                                                        <Link
                                                            className="nav-link active border border-dark w-25 text-center p-1 rounded-3"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#delete-appointment-modal"
                                                            onClick={() => handleDeleteAppointment(id, userId, petId, appointmentDate, appointmentTime)}
                                                        >Cancel
                                                        </Link>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                    ))}
                                </>
                            ) :
                            <div className="col mb-2 mt-5 mb-5 text-light text-center ms-auto me-auto">
                                <span className="fs-4 ">You have no scheduled appointments</span>
                            </div>
                        }
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

                        {allPets.length > 0 ? (
                                <>
                                    {allPets.map(({id, animalType, breed, firstName, lastName, age, weight, user_id}) => (
                                        <div className="col mb-4 mt-5">
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
                                        </div>
                                    ))}
                                </>

                            ) :
                            <div className="col mb-2 mt-5 mb-5 text-light text-center ms-auto me-auto">
                                <span className="fs-4 ">You have no pets associated with your account</span>
                            </div>
                        }
                    </div>

                </div>
            </div>
            <AppointmentModal/>
            <EditAppointmentModal/>
            <DeleteAppointmentModal/>
            <EditPetModal/>
            <DeletePetModal/>
            <PetModal/>
        </>
    );
}

export default ProfilePage