const {Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("Products", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        imageLink: {
            type: DataTypes.STRING(1000),
            allowNull: false
        }
    })

    return Products;
}

