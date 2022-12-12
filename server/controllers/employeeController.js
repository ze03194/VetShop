const db = require('../models');
const Employees = db.employees;

const createEmployee = async (req, res) => {
    const employee = req.body;
    await Employees.create(employee);

    return res.status(200).json({"Created Employee": employee})
}

const updateEmployee = async (req, res) => {
    const updatedEmployee = req.body;
    const employee = await Employees.findByPk(updatedEmployee.id);
    await employee.set(updatedEmployee);
    await employee.save();

    return res.status(200).json({"Updated Employee": employee})
}

const deleteEmployee = async (req, res) => {
    const data = req.body;
    const employee = await Employees.findByPk(data.id);
    await employee.destroy();

    return res.status(200).json({"Deleted Employee": employee})
}

const findEmployeeById = async (req, res) => {
    const data = req.body;
    const employee = await Employees.findByPk(data.id);

    return res.status(200).json(employee);
}

const getAllEmployees = async (req, res) => {
    const listOfEmployees = await Employees.findAll();

    return res.status(200).json(listOfEmployees)
}

module.exports = {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    findEmployeeById,
    getAllEmployees
}