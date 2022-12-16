const db = require('../models');
const Users = db.users;
const Pets = db.pets;
const Appointments = db.appointments;
const RefreshTokens = db.refreshToken
const bcrypt = require('bcrypt');
const {where} = require("sequelize");

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

const findUserByToken = async (req, res) => {
    const data = req.body;

    try {
        const foundToken = await RefreshTokens.findAll({
            where: {token: data.token}
        })
        const user = await Users.findAll({
            where: {email: foundToken[0].dataValues.email},
            include: 'Pets',

        })

        let {password, createdAt, updatedAt, ...returnUser} = user[0].dataValues

        for (let i = 0; i < returnUser.Pets.length; i++) {
            let {createdAt, updatedAt, ...Pet} = returnUser.Pets[i].dataValues
            returnUser.Pets[i] = Pet
        }

        return res.status(200).json(returnUser)
    } catch (error) {
        console.log(error.message)
    }

}

const findUserById = async (req, res) => {
    const data = req.body;
    const user = await Users.findByPk(data.id, {
        include: 'Pets',
    })
    return res.json(user);
}

const findUserByEmail = async (data) => {
    const user = await Users.findAll({
        where: {email: data}
    })
    return user[0].dataValues.id
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

const refreshData = async (req, res) => {

    const listOfPets = await Pets.findAll({
        where: {user_id: req.body.id}
    })

    const listOfAppointments = await Appointments.findAll({
        where: {user_id: req.body.id}
    })

    return res.status(200).json({pets: listOfPets, appointments: listOfAppointments})
}

module.exports = {
    createUser,
    findUserById,
    findUserByToken,
    findUserByEmail,
    updateUser,
    deleteUser,
    getAllUsers,
    refreshData
}