import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectUser} from "../../features/user/userSlice";
import {useNavigate} from "react-router-dom";
import {createPet} from "../../api/PetService";

const PetModal = () => {
    const navigate = useNavigate();
    const [pet, setPet] = useState({});
    const user = useSelector(selectUser);

    const handleChange = (key, value) => {
        setPet(({
            ...pet,
            [key]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        createPet(pet, user.id)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

        let petForm = document.getElementById('add-pet-form');
        petForm.reset();

        navigate("/", {state: {from: '/profile'}})
    }


    return (
        <div className="modal fade" id="pet-modal" data-bs-backdrop="false" data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="staticBackdropLabel">Add Pet</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="add-pet-form">
                            <div className="d-flex">
                                <label htmlFor="pet-first-name"></label>
                                <input type="text" className="form-control me-2" id="pet-first-name"
                                       placeholder={'First name'}

                                       onChange={(event) => handleChange("firstName", event.target.value)}

                                />
                                <label htmlFor="pet-last-name"></label>
                                <input type="text" className="form-control" id="pet-last-name"
                                       placeholder={'Last Name'}
                                       onChange={(event) => handleChange("lastName", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-animal-type"></label>
                                <input type="text" className="form-control" id="pet-animal-type"
                                       placeholder={'Animal type'}
                                       onChange={(event) => handleChange("animalType", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-breed"></label>
                                <input type="text" className="form-control" id="pet-breed"
                                       placeholder={'Breed'}
                                       onChange={(event) => handleChange("breed", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-age"></label>
                                <input type="text" className="form-control" id="pet-age"
                                       placeholder={'Age'}
                                       onChange={(event) => handleChange("age", event.target.value)}
                                />
                            </div>
                            <div className="mb-0">
                                <label htmlFor="pet-weight"></label>
                                <input type="text" className="form-control" id="pet-weight"
                                       placeholder={'Weight' + ' (lbs)'}
                                       onChange={(event) => handleChange("weight", event.target.value)}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-backdrop="false" data-bs-dismiss="modal">Cancel
                        </button>
                        <button id="add-pet-btn"
                                onClick={handleSubmit}
                                type="button"
                                className="btn btn-primary"
                                data-bs-dismiss="modal">Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default PetModal