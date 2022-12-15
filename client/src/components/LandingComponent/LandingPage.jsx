import React, {useEffect, useState} from "react";
import NavComponent from "../NavComponent/NavComponent";
import useAuth from "../../hooks/useAuth";
import LoggedInNavComponent from "../NavComponent/LoggedInNavComponent";
import {Link} from "react-router-dom";
import './LandingStyles.css'
import '../CustomStyles.css'
import {addToCart} from "../../features/cart/cartSlice";

import {faMinus, faPlus, faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../api/ProductService";


const isLoggedIn = window.sessionStorage.getItem("isLoggedIn");


function LandingPage() {
    const {auth} = useAuth();
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const [allProducts, setAllProducts] = useState([{}])
    const [testing, setTesting] = useState('')
    // const navigate = useNavigate();
    // const location = useLocation();
    // const email = auth.email

    useEffect(() => {
        getAllProducts()
            .then((response) => {
                setAllProducts(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    const handleAddToCart = (product) => {
        dispatch(addToCart({
            product_id: product.id,
            product_name: product.name,
            product_description: product.description,
            product_price: product.price,
            product_imageLink: product.imageLink
        }))
        setTesting('qwewq')
    }

    const renderProducts = allProducts.map(product => (
        <div className="col mb-4 individual-cards" id="individual-cards">
            <div className="card-body">
                <div
                    className="card align-self-center mt-5 border border-3  rounded-4 "
                    id="individual-product-card">
                    <div className="card-body d-flex flex-column custom-lc-bgw">
                        <h6 className="card-title bg-light text-center">
                            <img className="img-fluid align-self-center mt-2 custom-lc-images"

                                 src={product.imageLink}
                                // src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
                                 alt=""/>
                        </h6>
                        <div className="">
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStar}/>
                            <FontAwesomeIcon icon={faStarHalfAlt}/>
                        </div>
                        <div className="d-flex mt-3">
                            <p className="card-text me-3">${product.price}</p>
                            <div className="d-flex ms-auto">
                                <button className="btn me-1">
                                    <FontAwesomeIcon className="mb-2" icon={faMinus}/>
                                </button>
                                <button className="btn" onClick={() => handleAddToCart(product)}>
                                    <FontAwesomeIcon className="mb-2" icon={faPlus}/>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    ))

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
                    <div className="d-flex flex-row flex-nowrap text-dark custom-lc-oflow">
                        {renderProducts}

                    </div>
                </div>
            </div>
        </>


    );
}

export default LandingPage