import axios from "axios";

const localHostURL = "http://localhost:8080"


function RefreshService() {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/refresh',
        // url: localHostURL + "/refreshToken",
        headers: {'Content-Type': 'application/json'},
        data: {
            refreshToken: window.sessionStorage.getItem("refreshToken")
        }
    })
}

export default RefreshService