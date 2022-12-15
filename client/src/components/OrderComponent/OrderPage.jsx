import React, {useState} from "react";
import useAuth from "../../hooks/useAuth";
import LoggedInNavComponent from "../NavComponent/LoggedInNavComponent";
import NavComponent from "../NavComponent/NavComponent";
import {removeItem, selectAllOrders} from "../../features/cart/cartSlice";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faStarHalfAlt, faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import OrderModal from "../modals/OrderModal";

const OrderPage = () => {
    const {auth} = useAuth();
    const cart = useSelector(selectAllOrders)
    const [quantity, setQuantity] = useState(0)
    const [productRemoved, setProductRemoved] = useState(false)
    const [totalPrice, setTotalPrice] = useState(cart.totalPrice)
    const [order, setOrder] = useState({})
    const dispatch = useDispatch();


    const handleSelector = (event, productPrice) => {
        let value = event.target.value;
        setQuantity(value)
        const newPrice = value * productPrice;
        setTotalPrice(newPrice);
    }

    const handleRemoveProduct = (product) => {
        dispatch(removeItem(product))
        setProductRemoved(true)
        const newPrice = totalPrice - product.product_price * product.quantity;
        setTotalPrice(newPrice);
    }

    const renderedOrders = cart.cart.map(product => (

        <div className="container bg-dark bg-gradient rounded-4 custom-shadow mb-3 ">
            <Link className="nav-link" onClick={() => handleRemoveProduct(product)}>
                <FontAwesomeIcon className="text-light float-end mt-1 me-3 fa-2x" icon={faXmark}/>
            </Link>
            <h6 className="text-light mt-2 ms-3">Product #: {product.product_id}</h6>
            <div className="col mb-4 individual-cards" id="individual-cards">
                <div className="card-body">
                    <div
                        className="card align-self-center mt-3 border border-3  rounded-4 "
                        id="individual-product-card">
                        <div className="card-body d-flex text-dark">
                            <h6 className="card-title d-flex flex-column">
                                <img className="img-fluid  mt-2"
                                     id="cardimgs"
                                     src={product.product_imageLink}
                                    // src="https://image.chewy.com/is/image/catalog/46860_MAIN._AC_SL1200_V1636151212_.jpg"
                                    // src="https://shop-assets.dogtime.com/prod/2bf9063f11ea42c697936f56846167d9/f42507f28b60ee551a99ef631dd47f4f22127d56cce2e06f138e2f59c97a6873/l/pedigree-roasted-chicken-rice-and-vegetable-flavor-adult-complete-nutrition-dry-dog-food-33lbs"
                                     alt=""/>
                                <div className="container">
                                    <FontAwesomeIcon className="mt-2" icon={faStar}/>
                                    <FontAwesomeIcon icon={faStar}/>
                                    <FontAwesomeIcon icon={faStarHalfAlt}/>
                                </div>
                            </h6>

                            <div className="align-self-start ms-3 mt-2 fw-bold ">
                                <div className="container d-flex flex-column ">
                                    <p className="card-text mb-5">{product.product_name}</p>
                                    <p className="card-text ms-2 fw-normal mb-1">Quantity</p>
                                    <select className="form-select " id="selectQuantity"
                                            defaultValue={product.quantity}
                                            onChange={(event) => {
                                                handleSelector(event, product.product_price)
                                            }}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                    </select>
                                </div>
                            </div>


                            <div className="align-self-start ms-auto fw-bold">
                                <div className="">
                                    <p className="card-text mt-2">Price</p>
                                    <p className="card-text">${product.product_price}</p>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </div>
    ))

    const handleSubmitOrder = async (e) => {
        e.preventDefault();

        let listOfProductIds = []
        cart.cart.map(product => listOfProductIds.push(product.product_id))
        let order = {products: listOfProductIds, totalPrice: totalPrice}
        setOrder(order)

        // createOrder(order)
        //     .then(response => {
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        // console.log(order)
    }

    return (
        <>
            {auth?.email
                ? <LoggedInNavComponent/>
                : <NavComponent/>}

            {cart.cart.length > 0 ? (
                    <div
                        className="container d-flex flex-column p-3 mt-5 mb-5 bg-light bg-gradient rounded-4 custom-shadow ">
                        {renderedOrders}
                        <div className="container d-flex">
                            <span className="text-dark fw-bold">Total Price:</span>
                            <span
                                className="text-dark fw-bold ms-auto ">${(totalPrice).toFixed(2)}</span>
                        </div>
                        <button className="btn btn-dark w-25 mt-3 ms-auto"
                                data-bs-toggle="modal"
                                data-bs-target="#order-modal"
                                onClick={handleSubmitOrder}
                        >Order
                        </button>
                    </div>
                ) :
                <div className="d-flex container justify-content-center  ">
                    <div
                        className="d-flex flex-column bg-dark bg-gradient text-light rounded-4 p-5  mt-5 align-items-center custom-shadow">
                        <span>You currently have no orders in your cart.</span>
                        {/*<span>Please login <Link className="text-light" data-bs-toggle="modal"*/}
                        {/*                         data-bs-target="#login-modal">here</Link>.</span>*/}
                    </div>

                </div>
            }

            <OrderModal value={order}/>
        </>
    );
}

export default OrderPage