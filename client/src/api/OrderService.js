import axios from "axios";

const localHostURL = "http://localhost:8080"

const ProductService = () => {
}

const createOrder = (order) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/orders/createOrder',
        headers: {},
        data: {
            products: order.products,
            email: order.email,
            total_price: order.totalPrice,

        }
    })
}

export {createOrder}

export default ProductService