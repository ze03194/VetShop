const db = require('../models');
const Users = db.users;
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    const user = req.body;

    try {
        const duplicate = await Users.findAll({
            where: {email: user.email}
        })
        if (duplicate[0].dataValues.email === user.email) {
            return res.status(409).json({"message": "Email already exists"})
        }

    } catch (error) {
        console.log(error.message)
    }


    try {
        user.password = await bcrypt.hash(user.password, 10);
        await Users.create(user);
        return res.status(200).json({"User created": user});
    } catch (error) {
        res.status(500).json({'message': error.message})
    }

}

const findUserById = async (req, res) => {
    const data = req.body;
    const user = await Users.findByPk(data.id, {
        include: 'Pets',
    })
    return res.json(user);
}

const updateUser = async (req, res) => {
    const updatedUser = req.body;
    const user = await Users.findByPk(updatedUser.id);
    await user.set(updatedUser);
    await user.save();

    return res.status(200).json({"Updated user": user})
}

const deleteUser = async (req, res) => {
    const data = req.body;
    const user = await Users.findByPk(data.id);
    await user.destroy();

    return res.status(200).json({"Deleted user": user});
}

const getAllUsers = async (req, res) => {
    const listOfUsers = await Users.findAll();

    return res.status(200).json(listOfUsers)
}

module.exports = {
    createUser,
    findUserById,
    updateUser,
    deleteUser,
    getAllUsers
}