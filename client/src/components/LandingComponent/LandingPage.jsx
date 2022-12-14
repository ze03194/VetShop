import React, {useEffect} from "react";
import NavComponent from "../NavComponent/NavComponent";
import useAuth from "../../hooks/useAuth";
import LoggedInNavComponent from "../NavComponent/LoggedInNavComponent";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './LandingStyles.css'

import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

function LandingPage() {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const email = auth.email

    useEffect(() => {
        if (location.state !== null) {
            const {state} = location
            navigate(state.from)
        }
        if (location.state === null) {
            console.log('it is null')
        }
        // if (from) {
        //     navigate(from)
        // }
        let cardElements = document.getElementsByClassName('individual-cards')

        function checkWindowSize() {
            if (window.innerWidth < 720) {
                for (let i = 0; i < cardElements.length; i++) {
                    cardElements[i].style.width = "100%"
                }
                // cardElement.style.width = "100%"
            }
            if (window.innerWidth > 720) {
                for (let i = 0; i < cardElements.length; i++) {
                    cardElements[i].style.width = "27%"
                }
            }
        }

        function handleResize() {
            checkWindowSize()
        }

        checkWindowSize()

        window.addEventListener('resize', handleResize)

    }, [])

    return (
        <>
            {auth?.email
                ? <LoggedInNavComponent/>
                : <NavComponent/>}

            <div className="container-fluid d-flex flex-column">
                <h3 className="text-center mt-5 ">Welcome to the Vet Shop!</h3>
                <div
                    className="card  align-self-center mt-5 p-2 border border-3 border-primary rounded-4 bg-light"
                    id="book-apt-card">
                    <div className="card-body ">
                        <h5 className="card-title text-center">Schedule an appointment</h5>
                        <p className="card-text text-center">Now accepting new clients</p>
                        <p className="card-text text-center">Please click <Link to="/appointment">here</Link> to
                            schedule an
                            appointment for
                            your
                            pet!</p>
                    </div>
                </div>

                <div
                    className="card  align-self-center mt-5 p-2 border border-3 border-primary bg-light rounded-4 mb-5"
                    id="display-products-card">
                    <h5 className="card-title text-center">Check out some of our products</h5>
                    <div className="row row-cols-1 row-cols-md-1 ">
                        <div className="col mb-4 individual-cards" id="individual-cards">
                            <div className="card-body">
                                <div
                                    className="card align-self-center mt-5 border border-3  rounded-4"
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className=" align-self-center mt-2"
                                                 id="cardimgs"
                                                 src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 alt=""/>
                                        </h6>
                                        <div>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <FontAwesomeIcon icon={faStarHalfAlt}/>
                                        </div>
                                        <p className="card-text mt-3">$54.86</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="col mb-4 individual-cards" id="individual-cards">
                            <div className="card-body">
                                <div
                                    className="card align-self-center mt-5 border border-3  rounded-4"
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                 src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 alt=""/>
                                        </h6>
                                        <div>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <FontAwesomeIcon icon={faStar}/>
                                            <FontAwesomeIcon icon={faStarHalfAlt}/>
                                        </div>
                                        <p className="card-text mt-3">$54.86</p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </>


    );
}

export default LandingPage