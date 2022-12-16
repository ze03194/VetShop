import React from "react";
import {Link} from "react-router-dom";
import LoginModal from "../modals/LoginModal";
import NavComponent from "../NavComponent/NavComponent";
import '../CustomStyles.css'

const PromptLogin = () => {
    return (
        <>
            <NavComponent/>
            <div className="d-flex container justify-content-center  ">
                <div
                    className="d-flex flex-column bg-dark bg-gradient text-light rounded-4 p-5 mt-5 align-items-center custom-shadow">
                    <span>You must be logged in to access this page.</span>
                    <span>Please login <Link className="text-light" data-bs-toggle="modal"
                                             data-bs-target="#login-modal">here</Link>.</span>
                </div>

            </div>
            <LoginModal/>
        </>
    );
}

export default PromptLogin