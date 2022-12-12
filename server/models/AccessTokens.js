module.exports = (sequelize, DataTypes) => {
    const AccessToken = sequelize.define("AccessToken", {
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
    return AccessToken
}