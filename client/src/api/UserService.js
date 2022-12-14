import axios from "axios";

const localHostURL = "http://localhost:8080"

const UserService = () => {

    return axios({
        method: 'post',
        url: 'http://localhost:8080/users/findUserByToken',
        headers: {},
        data: {
            token: window.sessionStorage.getItem("refreshToken")
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

export {getUserById}

export default UserService