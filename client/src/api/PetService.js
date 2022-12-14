import axios from "axios";

const localHostURL = "http://localhost:8080"

const PetService = () => {

}
const createPet = (petInfo) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/pets/createPet',
        headers: {},
        data: {
            petInfo
        }
    })
}

const updatePet = (petInfo) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/pets/updatePet',
        headers: {},
        data: {
            id: petInfo.id,
            animalType: petInfo.animalType,
            breed: petInfo.breed,
            firstName: petInfo.firstName,
            lastName: petInfo.lastName,
            age: petInfo.age,
            weight: petInfo.weight,
            user_id: petInfo.userId
        }
    })
}

const findAppointmentsByUser = (user_id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/appointments/findAppointmentsByUser',
        headers: {},
        data: {
            user_id: user_id
        }
    })
}

const deletePet = (id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/pets/deletePet',
        headers: {},
        data: {
            id: id
        }
    })
}

const findAppointmentById = async (id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/appointments/findAppointmentById',
        headers: {},
        data: {
            id: id
        }
    })
}


export {updatePet, deletePet}

export default PetService