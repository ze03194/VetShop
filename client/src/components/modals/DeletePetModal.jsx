import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {deletePet} from "../../api/PetService";

const DeletePetModal = (petInfo) => {
    const navigate = useNavigate();
    const location = useLocation()
    const [pet, setPet] = useState({});

    useEffect(() => {
        if (Object.keys(petInfo.value.pet).length !== 0) {
            setPet(petInfo.value.pet)
        }
    })

    const handleSubmit = () => {

        deletePet(pet.id)
            .then((response) => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        navigate("/", {state: {from: '/profile'}})
    }

    return (
        <div className="modal fade" id="delete-pet-modal" data-bs-backdrop="false" data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="staticBackdropLabel">Delete Pet</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="delete-pet-form">
                            <div className="d-flex ">
                                <label htmlFor="pet-first-name"></label>
                                <input type="text" className="form-control me-2" id="pet-first-name"
                                       placeholder={pet.firstName}
                                       disabled

                                />
                                <label htmlFor="pet-last-name"></label>
                                <input type="text" className="form-control" id="pet-last-name"
                                       placeholder={pet.lastName}
                                       disabled

                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-animal-type"></label>
                                <input type="text" className="form-control" id="pet-animal-type"
                                       placeholder={pet.animalType}
                                       disabled
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-breed"></label>
                                <input type="text" className="form-control" id="pet-breed"
                                       placeholder={pet.breed}
                                       disabled
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-age"></label>
                                <input type="text" className="form-control" id="pet-age"
                                       placeholder={pet.age}
                                       disabled
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-weight"></label>
                                <input type="text" className="form-control" id="pet-weight"
                                       placeholder={pet.weight + ' (lbs)'}
                                       disabled
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-backdrop="false" data-bs-dismiss="modal">Cancel
                        </button>
                        <button id="update-pet-btn"
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

export default DeletePetModal