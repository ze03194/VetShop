import axios from "axios";

const localHostURL = "http://localhost:8080"

const LoginService = (user) => {

    return axios({
        method: 'post',
        url: 'http://localhost:8080/authentication/login',
        headers: {},
        data: {
            userEmail: user.email,
            password: user.password,
        }
    })

}

export default LoginService