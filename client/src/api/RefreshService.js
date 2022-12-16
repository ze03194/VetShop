import axios from "axios";

const localHostURL = "http://localhost:8080"

const RefreshService = (token) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/refresh',
        // url: localHostURL + "/refreshToken",
        headers: {'Content-Type': 'application/json'},
        data: {
            refreshToken: token
        }
    })
}

export default RefreshService