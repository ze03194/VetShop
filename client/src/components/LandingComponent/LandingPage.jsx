import React from "react";
import NavComponent from "../NavComponent/NavComponent";
import useAuth from "../../hooks/useAuth";
import LoggedInNavComponent from "../NavComponent/LoggedInNavComponent";
import {Link, useLocation, useNavigate} from "react-router-dom";
import './LandingStyles.css'
import '../CustomStyles.css'

import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");

function LandingPage() {
    const {auth} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const email = auth.email

    // useEffect(() => {
    //     if (location.state !== null) {
    //         const {state} = location
    //         navigate(state.from)
    //     }
    //     if (location.state === null) {
    //         console.log('it is null')
    //     }
    //     // if (from) {
    //     //     navigate(from)
    //     // }
    //     let cardElements = document.getElementsByClassName('individual-cards')
    //
    //     function checkWindowSize() {
    //         if (window.innerWidth < 720) {
    //             for (let i = 0; i < cardElements.length; i++) {
    //                 cardElements[i].style.width = "100%"
    //             }
    //             // cardElement.style.width = "100%"
    //         }
    //         if (window.innerWidth > 720) {
    //             for (let i = 0; i < cardElements.length; i++) {
    //                 cardElements[i].style.width = "27%"
    //             }
    //         }
    //     }
    //
    //     function handleResize() {
    //         checkWindowSize()
    //     }
    //
    //     checkWindowSize()
    //
    //     window.addEventListener('resize', handleResize)
    //
    // }, [])

    return (
        <>
            {auth?.email
                ? <LoggedInNavComponent/>
                : <NavComponent/>}

            <div className="container-fluid d-flex flex-column ">


                <div
                    className="card align-self-center mt-5 p-2 bg-dark bg-gradient
                      text-light border border-2 border-dark rounded-4 custom-shadow"
                    id="book-apt-card">
                    <h3 className="text-center ">Welcome to the Vet Shop!</h3>
                    <div className="card-body ">
                        <h5 className="card-title text-center">Schedule an appointment</h5>
                        <p className="card-text text-center">Now accepting new clients</p>
                        <p className="card-text text-center">
                            Please click <Link className="text-light" to="/appointment">here</Link> to schedule an
                            appointment for your pet!
                        </p>
                    </div>
                </div>


                <div
                    className="card mt-5 p-2 bg-dark bg-gradient rounded-4 mb-5  border border-2 border-dark custom-shadow text-light "
                    id="display-products-card">
                    <h5 className="card-title text-center">Check out some of our products</h5>


                    {/*Columns?*/}
                    {/*<div className="row row-cols-1 row-cols-md-6 text-dark">*/}

                    {/*Horizontal-Scrollable?*/}
                    <div className="d-flex flex-row row-cols-sm-6 flex-nowrap text-dark " id="testing123">


                        <div className="col mb-4 individual-cards" id="individual-cards">
                            <div className="card-body">
                                <div
                                    className="card align-self-center mt-5 border border-3  rounded-4 "
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
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

                        {/*<div className="col mb-4 individual-cards" id="individual-cards">*/}
                        {/*    <div className="card-body">*/}
                        {/*        <div*/}
                        {/*            className="card  mt-5 border border-3  rounded-4 "*/}
                        {/*            id="individual-product-card">*/}
                        {/*            <div className="card-body d-flex flex-column">*/}

                        {/*                <h6 className="card-title bg-light text-center">*/}
                        {/*                    <img className=" align-self-center mt-2"*/}
                        {/*                         id="cardimgs"*/}
                        {/*                        // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"*/}
                        {/*                         src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"*/}
                        {/*                         alt=""/>*/}
                        {/*                </h6>*/}
                        {/*                <div>*/}
                        {/*                    <FontAwesomeIcon icon={faStar}/>*/}
                        {/*                    <FontAwesomeIcon icon={faStar}/>*/}
                        {/*                    <FontAwesomeIcon icon={faStarHalfAlt}/>*/}
                        {/*                </div>*/}
                        {/*                <p className="card-text mt-3">$54.86</p>*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}


                        <div className="col mb-4 individual-cards" id="individual-cards">
                            <div className="card-body">
                                <div
                                    className="card align-self-center mt-5 border border-3  rounded-4 "
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
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
                                    className="card align-self-center mt-5 border border-3  rounded-4 "
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
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
                                    className="card align-self-center mt-5 border border-3  rounded-4 "
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
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
                                    className="card align-self-center mt-5 border border-3  rounded-4 "
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
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
                                    className="card align-self-center mt-5 border border-3  rounded-4 "
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
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
                                    className="card align-self-center mt-5 border border-3  rounded-4 "
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
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
                                    className="card align-self-center mt-5 border border-3 rounded-4 h-100"
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
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
                                    className="card align-self-center mt-5 border border-3 rounded-4 h-100"
                                    id="individual-product-card">
                                    <div className="card-body d-flex flex-column">

                                        <h6 className="card-title bg-light text-center">
                                            <img className="img-fluid align-self-center mt-2"
                                                 id="cardimgs"
                                                // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                                 src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
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