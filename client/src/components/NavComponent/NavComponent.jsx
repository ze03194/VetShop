import React from "react";
import {Link} from "react-router-dom";
import RegisterModal from "../modals/RegisterModal";
import LoginModal from "../modals/LoginModal";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../CustomStyles.css'
import {useSelector} from "react-redux";


const NavComponent = () => {
    const cart = useSelector(state => state.cart)

    const renderQuantity = () => {
        if (cart.totalQuantity > 0) {
            return (
                <span className="badge text-light"
                      id="lblCartCount">{cart.totalQuantity}
                </span>
            )
        } else {
            return (
                <span className="badge text-light" id="lblCartCount"></span>
            )
        }
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark bg-gradient">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">Vet Shop</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse "
                         id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/test" className="nav-link active" aria-current="page">Contact Us</Link>
                            </li>
                            <li className="nav-item">
                                <Link id="login-link" data-bs-toggle="modal" data-bs-target="#login-modal"
                                      className="nav-link active" aria-current="page">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link id="register-link" data-bs-toggle="modal" data-bs-target="#register-modal"
                                      className="nav-link active">Register</Link>
                            </li>
                        </ul>
                        <div className="d-flex text-light me-4 ">
                            <Link className="nav-link" to="/orders">
                                <i>
                                    <FontAwesomeIcon icon={faCartShopping}/>
                                    {renderQuantity()}
                                </i>
                            </Link>
                        </div>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-light" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <RegisterModal/>
            <LoginModal/>
        </>
    );
}

export default NavComponent