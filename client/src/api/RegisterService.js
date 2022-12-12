import axios from "axios";

const localHostURL = "http://localhost:8080"

const RegisterService = (user) => {



    return axios({
        method: 'post',
        url: 'http://localhost:8080/users/registerUser',
        headers: {},
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            address: user.address,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode
        }
    })

}

export default RegisterService