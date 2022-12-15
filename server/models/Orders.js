const {Sequelize} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("Orders", {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        products: {
            type: DataTypes.JSON,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        total_price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
    })

    return Orders;
}

