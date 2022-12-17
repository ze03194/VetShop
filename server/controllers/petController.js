const db = require('../models');
const Pets = db.pets;

const createPet = async (req, res) => {
    try {
        const pet = req.body;

        if (!pet.firstName || !pet.lastName || !pet.animalType || !pet.breed || !pet.age || !pet.weight) {
            return res.status(400).json({message: "Missing params"})
        }

        await Pets.create(pet);
        return res.json({"Pet created": pet});

    } catch (error) {
        console.log(error)
    }
}

const updatePet = async (req, res) => {
    const updatedPet = req.body;
    const pet = await Pets.findByPk(updatedPet.id);
    await pet.set(updatedPet);
    await pet.save();

    return res.status(200).json({"Updated Pet": pet});
}

const deletePet = async (req, res) => {
    const data = req.body;
    const pet = await Pets.findByPk(data.id);
    await pet.destroy();

    return res.status(200).json({"Deleted Pet": pet});
}

const findPetsByOwner = async (req, res) => {
    const data = req.body;
    const listOfPets = await Pets.findAll({
        where: {
            user_id: data.user_id
        }
    })

    res.status(200).json(listOfPets)
}

const findPetByUserIdAndPetName = async (data) => {

}

module.exports = {
    createPet,
    updatePet,
    deletePet,
    findPetsByOwner
}