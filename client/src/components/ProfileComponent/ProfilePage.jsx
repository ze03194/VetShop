import React, {useEffect, useState} from "react";
import LoggedInNavComponent from "../NavComponent/LoggedInNavComponent";
import NavComponent from "../NavComponent/NavComponent";
import useAuth from "../../hooks/useAuth";
import UserService from "../../api/UserService";
import {findAppointmentsByUser} from "../../api/AppointmentService";
import {Link} from "react-router-dom";
import EditAppointmentModal from "../modals/EditAppointmentModal";
import DeleteAppointmentModal from "../modals/DeleteAppointmentModal";
import EditPetModal from "../modals/EditPetModal";
import DeletePetModal from "../modals/DeletePetModal";
import '../CustomStyles.css'

const ProfilePage = () => {
    const {auth} = useAuth();
    const [user, setUser] = useState({})
    const [userFound, setUserFound] = useState(false)
    const [allAppointments, setAllAppointments] = useState([{}])
    const [allPets, setAllPets] = useState([{}])
    const [appointment, setAppointment] = useState({})
    const [pet, setPet] = useState({})

    useEffect(() => {
        console.log('woopie')
    })

    useEffect(() => {
        async function fetchData() {
            const response = await UserService()
                .then((response) => {
                    setUser(response.data)
                    setUserFound(true)
                    let allPetsHolder = response.data.Pets;
                    // for (let i = 0; i < response.data.Pets.length; i++) {
                    //     allPetsHolder.push(response.data.Pets[i])
                    // }
                    setAllPets(response.data.Pets)

                })
                .catch(error => {
                    setUserFound(false)
                })

        }

        fetchData()
            .then(() => {
                if (user.id) {
                    findAppointmentsByUser(user.id)
                        .then(response => {

                            let allApptHolder = [];

                            for (let i = 0; i < response.data.length; i++) {
                                allApptHolder.push(response.data[i]);
                                allApptHolder[i].appointmentDate = new Date(response.data[i].appointmentDate).toISOString().split('T')[0]
                                let hours = response.data[i].appointmentTime.split(':')[0]
                                let minutes = response.data[i].appointmentTime.split(':')[1]
                                let amOrpm = hours >= 12 ? 'pm' : 'am';
                                hours = (hours % 12) || 12;
                                allApptHolder[i].appointmentTime = hours + ':' + minutes + " " + amOrpm
                            }
                            setAllAppointments(allApptHolder)
                        })
                        .catch(error => {
                            console.log(error)
                        })
                }

            })


    }, [userFound])


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
                        className="row row-cols-1 row-cols-md-3 mt-4 bg-dark bg-gradient rounded-4 custom-shadow">
                        {allAppointments.map(({id, appointmentDate, appointmentTime, user_id, pet_id}) => (
                            <div className="col mb-4 mt-3" key={id}>
                                {/*<div className="card-body mt-3 ">*/}
                                <div className="card border mb-3 mt-3 rounded-4">
                                    <div className="card-body bg-light rounded-4">
                                        <h6 className="card-title text-center mb-3">Appointment ID: {id}</h6>
                                        <p className="card-text mt-4 text-center">Date: {appointmentDate}</p>

                                        <p className="card-text text-center">Time: {appointmentTime}</p>
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
                                                data-bs-target="#delete-appointment-modal">Cancel</Link>
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
                    <div className="row row-cols-1 row-cols-md-3 mt-4 bg-dark bg-gradient rounded-4 custom-shadow">
                        {allPets.map(({id, animalType, breed, firstName, lastName, age, weight, user_id}) => (
                            <div className="col mb-4 mt-3" key={id}>
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
        </>
    );
}

export default ProfilePage