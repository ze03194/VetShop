import React, {useState} from "react";
import {Modal} from "bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {refreshState, selectUser} from "../../features/user/userSlice";
import {clearPet, selectPet} from "../../features/pet/petSlice";
import {updatePet} from "../../api/PetService";
import {refreshData} from "../../api/UserService";
import {createMessage} from "../../features/message/messageSlice";

const EditPetModal = (petInfo) => {
    const dispatch = useDispatch();
    const returnedPet = useSelector(selectPet);
    const user = useSelector(selectUser);
    const [modifiedPet, setModifiedPet] = useState({});


    const handleChange = (key, value) => {
        setModifiedPet(({
            ...returnedPet,
            [key]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let messageModal = new Modal(document.getElementById('message-modal'))

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

        if (Object.keys(modifiedPet).length > 0) {
            updatePet(updatedPet)
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
                        title: 'Update Pet Failed',
                        body: 'Please fill out all required fields.'
                    }))
                    messageModal.show();
                    console.log(error)
                })
        }

        dispatch(clearPet());
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
                                       placeholder={returnedPet.firstName}
                                       onChange={(event) => handleChange("firstName", event.target.value)}

                                />
                                <label htmlFor="pet-last-name"></label>
                                <input type="text" className="form-control" id="pet-last-name"
                                       placeholder={returnedPet.lastName}
                                       onChange={(event) => handleChange("lastName", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-animal-type"></label>
                                <input type="text" className="form-control" id="pet-animal-type"
                                       placeholder={returnedPet.animalType}
                                       onChange={(event) => handleChange("animalType", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-breed"></label>
                                <input type="text" className="form-control" id="pet-breed"
                                       placeholder={returnedPet.breed}
                                       onChange={(event) => handleChange("breed", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-age"></label>
                                <input type="text" className="form-control" id="pet-age"
                                       placeholder={returnedPet.age}
                                       onChange={(event) => handleChange("age", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-weight"></label>
                                <input type="text" className="form-control" id="pet-weight"
                                       placeholder={returnedPet.weight + ' (lbs)'}
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
                                className="btn btn-dark"
                                data-bs-dismiss="modal">Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditPetModal