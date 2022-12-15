import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {createOrder} from "../../api/OrderService";
import {useSelector} from "react-redux";
import {selectAllOrders} from "../../features/cart/cartSlice";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const OrderModal = (orderInfo) => {
    const {auth} = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState(window.sessionStorage.getItem("isLoggedIn"));
    const cart = useSelector(selectAllOrders);
    const [email, setEmail] = useState('');
    
    const handleGuestCheckoutClose = () => {
        let form = document.getElementById('guest-checkout-form');
        form.reset();
    }

    const handleCheckout = async (e, email) => {
        e.preventDefault();

        let form = document.getElementById('user-checkout-form');
        form.reset()
        const order = {products: orderInfo.value.products, email: email, totalPrice: cart.totalPrice}
        createOrder(order)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const handleGuestCheckout = async (e) => {
        e.preventDefault();
        let form = document.getElementById('guest-checkout-form');
        form.reset();
        const order = {products: orderInfo.value.products, email: email, totalPrice: cart.totalPrice}
        createOrder(order)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            {
                !auth?.email ? (
                        <div className="modal fade" id="order-modal" data-bs-backdrop="false" data-bs-keyboard="false"
                             tabIndex="-1"
                             aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content ">
                                    <div className="modal-header text-center">
                                        <h5 className="modal-title w-100" id="staticBackdropLabel">Guest Checkout</h5>
                                        <button type="button"
                                                className="btn-close"
                                                data-bs-dismiss="modal"
                                                onClick={handleGuestCheckoutClose}
                                                aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form id="guest-checkout-form">
                                            <div className="mb-sm-0">
                                                <label htmlFor="email"></label>
                                                <input type="text"
                                                       className="form-control"
                                                       id="email"
                                                       placeholder="Email"
                                                       onChange={(event) => setEmail(event.target.value)}/>
                                            </div>

                                            <div className="d-flex justify-content-end mt-3">
                                                <Link className="nav-link active me-3"
                                                      id="register-link"
                                                      data-bs-dismiss="modal" data-bs-toggle="modal"
                                                      data-bs-target="#register-modal">
                                                    Register
                                                </Link>
                                                <Link className="nav-link active" id="forgot-password-link"
                                                      data-bs-toggle="modal" data-bs-target="#login-modal">
                                                    Login
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary"
                                                data-backdrop="false" data-bs-dismiss="modal"
                                                onClick={handleGuestCheckoutClose}>
                                            Cancel
                                        </button>
                                        <button type="button"
                                                className="btn btn-dark" data-bs-dismiss="modal"
                                                onClick={handleGuestCheckout}>
                                            Order
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) :
                    <div className="modal fade" id="order-modal" data-bs-backdrop="false" data-bs-keyboard="false"
                         tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content ">
                                <div className="modal-header text-center">
                                    <h5 className="modal-title w-100" id="staticBackdropLabel">Checkout</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <form id="user-checkout-form">
                                        <div className="mb-sm-0">
                                            <label htmlFor="email"></label>
                                            <input type="text" className="form-control" id="email"
                                                   placeholder={auth.email} disabled defaultValue={auth.email}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary"
                                            data-backdrop="false" data-bs-dismiss="modal">Cancel
                                    </button>
                                    <button type="button" className="btn btn-dark" id="login-btn"
                                            data-bs-dismiss="modal"
                                            onClick={() => handleCheckout(auth.email)}>
                                        Order
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
            }

            <LoginModal/>
            <RegisterModal/>
        </>
    );
}

export default OrderModal