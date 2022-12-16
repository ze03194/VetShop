import axios from "axios";

const localHostURL = "http://localhost:8080"

const PetService = () => {

}
const createPet = (pet, user_id) => {
    console.log(JSON.stringify(pet))
    return axios({
        method: 'post',
        url: 'http://localhost:8080/pets/createPet',
        headers: {},
        data: {
            firstName: pet.firstName,
            lastName: pet.lastName,
            animalType: pet.animalType,
            breed: pet.breed,
            age: pet.age,
            weight: pet.weight,
            user_id: user_id
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

const findPetsByOwner = async (user_id) => {
    return axios({
        method: 'post',
        url: 'http://localhost:8080/pets/findPetsByOwner',
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


export {createPet, updatePet, deletePet, findPetsByOwner}

export default PetService