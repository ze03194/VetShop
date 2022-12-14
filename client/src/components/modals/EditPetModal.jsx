import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {updatePet} from "../../api/PetService";

const EditPetModal = (petInfo) => {
    const navigate = useNavigate();
    const [pet, setPet] = useState({});
    const [modifiedPet, setModifiedPet] = useState({});


    useEffect(() => {

        if (Object.keys(petInfo.value.pet).length !== 0) {
            setPet(petInfo.value.pet)
        }
    })

    const handleChange = (key, value) => {
        setModifiedPet(({
            ...pet,
            [key]: value
        }))
    }

    const handleSubmit = () => {
        const updatedPet = {
            id: modifiedPet.id,
            animalType: modifiedPet.animalType,
            breed: modifiedPet.breed,
            firstName: modifiedPet.firstName,
            lastName: modifiedPet.lastName,
            age: modifiedPet.age,
            weight: modifiedPet.weight,
            user_id: modifiedPet.user_id
        }

        let petForm = document.getElementById('edit-pet-form');
        petForm.reset();

        updatePet(updatedPet)
            .then((response) => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        navigate("/", {state: {from: '/profile'}})
    }

    return (
        <div className="modal fade" id="edit-pet-modal" data-bs-backdrop="false" data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="staticBackdropLabel">Edit Pet</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="edit-pet-form">
                            <div className="d-flex ">
                                <label htmlFor="pet-first-name"></label>
                                <input type="text" className="form-control me-2" id="pet-first-name"
                                       placeholder={pet.firstName}
                                       onChange={(event) => handleChange("firstName", event.target.value)}

                                />
                                <label htmlFor="pet-last-name"></label>
                                <input type="text" className="form-control" id="pet-last-name"
                                       placeholder={pet.lastName}
                                       onChange={(event) => handleChange("lastName", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-animal-type"></label>
                                <input type="text" className="form-control" id="pet-animal-type"
                                       placeholder={pet.animalType}
                                       onChange={(event) => handleChange("animalType", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-breed"></label>
                                <input type="text" className="form-control" id="pet-breed"
                                       placeholder={pet.breed}
                                       onChange={(event) => handleChange("breed", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-age"></label>
                                <input type="text" className="form-control" id="pet-age"
                                       placeholder={pet.age}
                                       onChange={(event) => handleChange("age", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-weight"></label>
                                <input type="text" className="form-control" id="pet-weight"
                                       placeholder={pet.weight + ' (lbs)'}
                                       onChange={(event) => handleChange("weight", event.target.value)}
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
                                data-bs-dismiss="modal">Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPetModal