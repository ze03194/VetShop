module.exports = (sequelize, DataTypes) => {
    const RefreshToken = sequelize.define("RefreshToken", {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expiration_time: {
            type: DataTypes.DATE,
            allowNull: false
        },
        token: {
            type: DataTypes.STRING(1000),
            allowNull: false
        }
    })
    return RefreshToken;
}