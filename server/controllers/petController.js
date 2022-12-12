const db = require('../models');
const Pets = db.pets;

const createPet = async (req, res) => {
    const pet = req.body;
    await Pets.create(pet);

    return res.json({"Pet created": pet});
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

    return res.status(200).json({"Delete Pet": pet});
}

const findPetsByOwner = async (req, res) => {
    const data = req.body;
    const listOfPets = await Pets.findAll({
        where: {
            user_id: data.id
        }
    })

    res.status(200).json(listOfPets)
}

module.exports = {
    createPet,
    updatePet,
    deletePet,
    findPetsByOwner
}