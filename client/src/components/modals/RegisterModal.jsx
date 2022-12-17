import React, {useEffect, useState} from "react";
import RegisterService from "../../api/RegisterService";
import {Modal} from "bootstrap";
import {checkIfEmailExists} from "../../api/UserService";
import MessageModal from "./MessageModals/MessageModal";
import {useDispatch} from "react-redux";
import {createMessage} from "../../features/message/messageSlice";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const numbersRegex = /^[0-9]+$/;

const RegisterModal = () => {
    const dispatch = useDispatch();
    const [validEmail, setValidEmail] = useState(false);
    const [emailError, setEmailError] = useState('');

    const [validPassword, setValidPassword] = useState(true);
    const [passwordError, setPasswordError] = useState([]);

    const [validPhone, setValidPhone] = useState(true);
    const [phoneError, setPhoneError] = useState('')

    const [validZip, setValidZip] = useState(false);
    const [zipError, setZipError] = useState('');


    const [minCharError, setMinCharError] = useState('');
    const [user, setUser] = useState({})


    const renderPwError = (
        <span className="text-danger">
            8 to 24 characters <br/>
            Must include uppercase and lowercase letters, a number and a special character <br/>
            Allowed special characters: !@#$%
        </span>
    )

    const renderPhoneError = (
        <span className="text-danger">
            Phone number can only contain numbers. <br/>
            Please do not include - or ()
        </span>
    )

    useEffect(() => {
        if (user?.email?.length > 0) {
            setValidEmail(emailRegex.test(user?.email))

            if (validEmail) {
                checkIfEmailExists(user.email)
                    .then(response => {

                    })
                    .catch(error => {
                        console.log(error.response.status)
                        setEmailError('Email already exists!')
                        setValidEmail(false)

                    })
            }

            if (!validEmail) {
                setEmailError('Invalid email')
            }
        } else {
            setEmailError('')
        }

        if (user?.password?.length > 0)
            setValidPassword(PWD_REGEX.test(user?.password))
        if (user?.phoneNumber?.length > 0)
            setValidPhone(numbersRegex.test(user?.phoneNumber))

        if (user?.zipCode?.length > 0) {
            setValidZip(numbersRegex.test(user?.zipCode))
            if (!validZip) {
                setZipError('Zipcode can only contain numbers')
            }
        } else {
            setZipError('')
        }


    }, [user])

    const handleChange = (key, value) => {
        setUser(({
            ...user,
            [key]: value
        }));
    }

    const handleRegister = async (e) => {
        e.preventDefault();

        document.getElementById('register-form').reset();

        let loginModal = new Modal(document.getElementById('login-modal'))
        let messageModal = new Modal(document.getElementById('message-modal'))

        if (user.firstName && user.lastName && user.email && user.password
            && user.phoneNumber && user.address && user.city && user.state
            && user?.zipCode !== '') {
            if (validEmail && validPassword && validZip && validPhone) {
                RegisterService(user)
                    .then((response) => {
                        if (response.status === 200) {
                            loginModal.show()
                        } else {

                            dispatch(createMessage({
                                title: 'Registration Failed',
                                body: 'Reason: Server Error'
                            }))

                            messageModal.show()
                        }

                    })
                    .catch((error) => {
                        setUser({})
                        loginModal.hide()
                        console.log(error)
                    })
            } else {
                setUser({})

                dispatch(createMessage({
                    title: 'Registration Failed',
                    body: 'Reason: Invalid details.'
                }))

                messageModal.show();
            }
            setUser({})

        } else {
            setUser({})

            dispatch(createMessage({
                title: 'Registration Failed',
                body: 'Reason: Invalid details.'
            }))

            messageModal.show()
        }
    }

    function handleCancel() {
        setUser({})
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
                                    onClick={handleCancel}
                                    aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {minCharError && (
                                <span className="mb-3 text-danger ms-2 ">{minCharError}</span>
                            )}
                            <form id="register-form">
                                <div className="d-flex ">
                                    <label htmlFor="firstName"></label>
                                    <input type="text" className="form-control me-2" id="firstName"
                                           placeholder="First name"
                                           required
                                           onChange={(event) => handleChange('firstName', event.target.value)}/>
                                    <label htmlFor="lastName"></label>
                                    <input type="text" className="form-control" id="lastName" placeholder="Last name"
                                           onChange={(event) => handleChange('lastName', event.target.value)}/>
                                </div>
                                <div className="mb-sm-0">
                                    <label htmlFor="email"></label>
                                    <input type="text" className="form-control" id="email" placeholder="Email"
                                           required
                                           onChange={(event) => handleChange('email', event.target.value)}/>
                                    {!validEmail && (
                                        <span className="text-danger">{emailError}</span>
                                    )}
                                </div>
                                <div className="mb-0">
                                    <label htmlFor="password"></label>
                                    <input type="password" className="form-control" id="password" placeholder="Password"
                                           required
                                           onChange={(event) => handleChange('password', event.target.value)}/>
                                    {(!validPassword && user.password?.length > 0) && (
                                        renderPwError
                                    )}
                                </div>
                                <div className="mb-0">
                                    <label htmlFor="phoneNumber"></label>
                                    <input type="text" className="form-control" id="phoneNumber"
                                           placeholder="Phone number"
                                           required
                                           onChange={(event) => handleChange('phoneNumber', event.target.value)}/>
                                    {(!validPhone && user.phoneNumber?.length > 0) && (
                                        renderPhoneError
                                    )}
                                </div>
                                <div className="mb-0">
                                    <label htmlFor="address"></label>
                                    <input type="text" className="form-control" id="address"
                                           placeholder="Address"
                                           required
                                           minLength={5}
                                           onChange={(event) => handleChange('address', event.target.value)}/>
                                </div>
                                <div className="d-flex mt-4">
                                    <label htmlFor="city"></label>
                                    <input type="text" className="form-control me-2" id="city"
                                           placeholder="City"
                                           required
                                           onChange={(event) => handleChange('city', event.target.value)}/>
                                    <label htmlFor="state"></label>
                                    <input type="text" className="form-control me-2" id="state"
                                           placeholder="State"
                                           maxLength={2}
                                           required
                                           onChange={(event) => handleChange('state', event.target.value)}/>
                                    <label htmlFor="zipCode"></label>
                                    <input type="text" className="form-control" id="zipCode"
                                           placeholder="Zipcode"
                                           required
                                           onChange={(event) => handleChange('zipCode', event.target.value)}/>

                                </div>
                                {zipError && (
                                    <span className="text-danger">{zipError}</span>
                                )}

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    data-backdrop="false" data-bs-dismiss="modal"
                                    onClick={handleCancel}>
                                Cancel
                            </button>
                            <button id="register-btn" onClick={handleRegister} type="button"
                                    className="btn btn-dark"
                                    data-bs-dismiss="modal">Register
                            </button>

                        </div>
                    </div>
                </div>
            </div>
            <MessageModal/>
        </>
    );
}

export default RegisterModal