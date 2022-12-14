import React from "react";
import {Link} from "react-router-dom";
import LoginModal from "../modals/LoginModal";
import NavComponent from "../NavComponent/NavComponent";

const PromptLogin = () => {
    return (
        <>
            <NavComponent/>
            <div className="d-flex container-fluid justify-content-center">
                <div
                    className="d-flex flex-column bg-light border rounded-4 p-5 border-primary  mt-5 align-items-center ">
                    <span>You must be logged in to access this page.</span>
                    <span>Please login <Link data-bs-toggle="modal" data-bs-target="#login-modal">here</Link>.</span>
                </div>

            </div>
            <LoginModal/>

        </>
    );
}

export default PromptLogin