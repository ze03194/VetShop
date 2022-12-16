import React, {useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import LoginService from "../../api/LoginService";
import useAuth from "../../hooks/useAuth";
import {Modal} from "bootstrap";
import {useDispatch} from "react-redux";
import {storeUser} from "../../features/user/userSlice";

const LoginModal = () => {
    const {setAuth} = useAuth();
    const {auth} = useAuth();
    const navigator = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();


    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleChange = (key, value) => {
        setUser(({
            ...user,
            [key]: value
        }));
    }

    const handleLogin = async (e) => {
        e.preventDefault()


        let myModal = new Modal(document.getElementById('login-modal'))
        await LoginService(user)
            .then((response) => {
                if (response.status === 200) {
                    let loginForm = document.getElementById('login-form');
                    loginForm.reset();

                    const email = user.email;
                    const pwd = user.password;
                    const accessToken = response?.data?.accessToken;
                    setAuth({email, pwd, accessToken})


                    dispatch(storeUser({
                        user: response.data.user,
                        pets: response.data.user.Pets,
                        appointments: response.data.user.Appointments,
                        accessToken: response.data.accessToken,
                        refreshToken: response.data.refreshToken,
                    }))
                    console.log('testing: ' + response.data.user.id)

                    // dispatch(initializePets(response.data.user.id))
                    // dispatch(initializeAppointments(response.data.user.id))

                    // dispatch(initializePets(response.data.user.Pets))
                    // dispatch(initializeAppointments(response.data.user.Appointments))

                    myModal.dispose();
                }
            })
            .catch(error => {
                console.log(error)
            })


    }


    return (
        <div className="modal fade" id="login-modal" data-bs-backdrop="false" data-bs-keyboard="false"
             tabIndex="-1"
             aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content ">
                    <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="staticBackdropLabel">Login</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form id="login-form">
                            <div className="mb-sm-0">
                                <label htmlFor="email"></label>
                                <input type="text" className="form-control" id="email" placeholder="Email"
                                       onChange={(event) => handleChange('email', event.target.value)}/>
                            </div>
                            <div className="mb-sm-0 ">
                                <label htmlFor="password"></label>
                                <input type="password" className="form-control me-2" id="password"
                                       placeholder="Password"
                                       onChange={(event) => handleChange('password', event.target.value)}/>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                                <Link id="register-link" data-bs-dismiss="modal" data-bs-toggle="modal"
                                      data-bs-target="#register-modal"
                                      className="nav-link active me-3">Register</Link>
                                <Link id="forgot-password-link" className="nav-link active">Forgot Password</Link>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary"
                                data-backdrop="false" data-bs-dismiss="modal">Cancel
                        </button>
                        <button id="login-btn" onClick={handleLogin} type="button"
                                className="btn btn-dark" data-bs-dismiss="modal">Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginModal