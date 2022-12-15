import axios from "axios";

const localHostURL = "http://localhost:8080"

const ProductService = () => {

    return axios({
        method: 'post',
        url: 'http://localhost:8080/users/findUserByToken',
        headers: {},
        data: {
            token: window.sessionStorage.getItem("refreshToken")
        }
    })

}

const getAllProducts = () => {
    return axios({
        method: 'get',
        url: 'http://localhost:8080/products/getAllProducts',
        headers: {},
        data: {
        }
    })
}

export {getAllProducts}

export default ProductService