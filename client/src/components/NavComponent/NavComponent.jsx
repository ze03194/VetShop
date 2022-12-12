import React, {useState} from "react";
import {Link} from "react-router-dom";
import RegisterModal from "../modals/RegisterModal";


const NavComponent = () => {

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
                <div className="container-fluid ">
                    <Link to="/" className="navbar-brand">Vet Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link id="register-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                      className="nav-link active">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <RegisterModal/>
        </>


    );
}

export default NavComponent