import React from "react";
import {Link, useNavigate} from "react-router-dom";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import useAuth from "../../hooks/useAuth";


const LoggedInNavComponent = () => {

    const {setAuth} = useAuth();
    const navigator = useNavigate();

    const handleLogout = () => {
        navigator('/');
        window.sessionStorage.removeItem("email");
        window.sessionStorage.removeItem("password");
        window.sessionStorage.removeItem("refreshToken");
        window.sessionStorage.setItem("isLoggedIn", "false");
        setAuth({})

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid ">
                    <Link to="/" className="navbar-brand">Vet Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse"
                         id="navbarSupportedContent">
                        <ul className="navbar-nav ">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <Link to="/" className="nav-link active" aria-current="page">About</Link>*/}
                            {/*</li>*/}
                            <li className="nav-item">
                                <Link to="/test" className="nav-link active" aria-current="page">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link active" aria-current="page">My Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link onClick={handleLogout} className="nav-link active" aria-current="page">Sign
                                    out</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <RegisterModal/>
            <LoginModal/>
        </>


    );
}

export default LoggedInNavComponent