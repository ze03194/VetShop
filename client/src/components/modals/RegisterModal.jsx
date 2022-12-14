import React, {useState} from "react";
import RegisterService from "../../api/RegisterService";
import useAuth from "../../hooks/useAuth";
import {Modal} from "bootstrap";

const RegisterModal = () => {
    const {auth} = useAuth();
    const [registerSuccess, setRegisterSuccess] = useState(false)

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        zipCode: ""
    })

    const handleChange = (key, value) => {
        setUser(({
            ...user,
            [key]: value
        }));
    }


    function handleRegister() {
        // let registerBtn = document.getElementById('register-btn');
        // registerBtn.setAttribute("data-bs-toggle", "modal")
        let myModal = new Modal(document.getElementById('login-modal'))
        RegisterService(user)
            .then((response) => {
                if (response.status === 200) {
                    console.log('itworked')
                    myModal.show()
                }
            })
            .catch((error) => {
                myModal.hide()
                console.log(error)
            })
        let registerForm = document.getElementById('register-form');
        registerForm.reset();

    }

    return (
        <>
            <div className="modal fade" id="register-modal" data-bs-backdrop="false" data-bs-keyboard="false"
                 tabIndex="-1"
                 aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header text-center">
                            <h5 className="modal-title w-100" id="staticBackdropLabel">Client Registration</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form id="register-form">
                                <div className="d-flex ">
                                    <label htmlFor="firstName"></label>
                                    <input type="text" className="form-control me-2" id="firstName"
                                           placeholder="First name"
                                           onChange={(event) => handleChange('firstName', event.target.value)}/>
                                    <label htmlFor="lastName"></label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Last name"
                                           onChange={(event) => handleChange('lastName', event.target.value)}/>
                                </div>
                                <div className="mb-sm-0">
                                    <label htmlFor="email"></label>
                                    <input type="text" className="form-control" id="email" placeholder="Email"
                                           onChange={(event) => handleChange('email', event.target.value)}/>
                                </div>
                                <div className="mb-0">
                                    <label htmlFor="password"></label>
                                    <input type="password" className="form-control" id="password" placeholder="Password"
                                           onChange={(event) => handleChange('password', event.target.value)}/>
                                </div>
                                <div className="mb-0">
                                    <label htmlFor="phoneNumber"></label>
                                    <input type="text" className="form-control" id="phoneNumber"
                                           placeholder="Phone number"
                                           onChange={(event) => handleChange('phoneNumber', event.target.value)}/>
                                </div>
                                <div className="mb-0">
                                    <label htmlFor="address"></label>
                                    <input type="text" className="form-control" id="address"
                                           placeholder="Address"
                                           onChange={(event) => handleChange('address', event.target.value)}/>
                                </div>
                                <div className="d-flex mt-4">
                                    <label htmlFor="city"></label>
                                    <input type="text" className="form-control me-2" id="city"
                                           placeholder="City"
                                           onChange={(event) => handleChange('city', event.target.value)}/>
                                    <label htmlFor="state"></label>
                                    <input type="text" className="form-control me-2" id="state"
                                           placeholder="State"
                                           onChange={(event) => handleChange('state', event.target.value)}/>
                                    <label htmlFor="zipCode"></label>
                                    <input type="text" className="form-control" id="zipCode"
                                           placeholder="Zipcode"
                                           onChange={(event) => handleChange('zipCode', event.target.value)}/>
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-backdrop="false" data-bs-dismiss="modal">Cancel
                            </button>
                            <button id="register-btn" onClick={handleRegister} type="button"
                                    className="btn btn-primary"
                                    data-bs-dismiss="modal">Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default RegisterModal