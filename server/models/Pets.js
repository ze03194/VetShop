module.exports = (sequelize, DataTypes) => {
    const Pets = sequelize.define("Pets", {
        animalType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        breed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        weight: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })

    return Pets
}