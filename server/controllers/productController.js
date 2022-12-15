const db = require('../models');
const Products = db.products;

const createProduct = async (req, res) => {
    const order = req.body;
    await Products.create(order);

    return res.status(200).json({"Product Created": order})
}

const updateProduct = async (req, res) => {
    const updatedProduct = req.body;
    const product = await Products.findByPk(updatedProduct.id);
    await product.set(updatedProduct);
    await product.save();

    return res.status(200).json({"Product Updated": product})
}

const deleteProduct = async (req, res) => {
    const data = req.body;
    const product = await Products.findByPk(data.id);
    await product.destroy();

    return res.status(200).json({"Deleted Product": product})
}

const findProductById = async (req, res) => {
    const data = req.body;
    const product = await Products.findByPk(data.id);

    return res.status(200).json(product)
}

const getAllProducts = async (req, res) => {
    const listOfProducts = await Products.findAll();

    return res.status(200).json(listOfProducts)
}


module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    findProductById,
    getAllProducts

}