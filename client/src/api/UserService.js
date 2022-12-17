import axios from "axios";

const localHostURL = "http://localhost:8080"

const UserService = (refreshToken) => {

    return axios({
        method: 'post',
        url: 'http://localhost:8080/users/findUserByToken',
        headers: {},
        data: {
            token: refreshToken
        }
    })

}

const getUserById = (user_id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/users/findUserById',
        headers: {},
        data: {
            id: user_id
        }
    })
}

const refreshData = (user_id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/users/refreshData',
        headers: {},
        data: {
            id: user_id
        }
    })
}

const checkIfEmailExists = async (checkEmail) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/users/checkIfEmailExists',
        headers: {},
        data: {
            email: checkEmail
        }
    })
}

export {getUserById, refreshData, checkIfEmailExists}

export default UserService