const db = require('../models');
const Orders = db.orders;
const {v4: uuidv4} = require('uuid');
const emailConfig = require("../config/emailConfig");
// const nodemailer = require('nodemailer')

const createOrder = async (req, res) => {
    let order = req.body;
    order = {...order, id: uuidv4()}

    await Orders.create(order);

    emailConfig(order)

    return res.status(200).json({"Order Created": order})
}

const updateOrder = async (req, res) => {
    const updatedOrder = req.body;
    const order = await Orders.findByPk(updatedOrder.id);
    await order.set(updatedOrder);
    await order.save();

    return res.status(200).json({"Order Updated": order})
}

const deleteOrder = async (req, res) => {
    const data = req.body;
    const order = await Orders.findByPk(data.id);
    await order.destroy();

    return res.status(200).json({"Deleted Order": order})
}

const findOrderById = async (req, res) => {
    const data = req.body;
    const order = await Orders.findByPk(data.id);

    return res.status(200).json(order)
}

const findOrdersByUserId = async (req, res) => {
    const data = req.body;
    const listOfOrders = await Orders.findAll({
        where: {user_id: data.user_id}
    })

    return res.status(200).json(listOfOrders)
}

module.exports = {
    createOrder,
    updateOrder,
    deleteOrder,
    findOrderById,
    findOrdersByUserId
}