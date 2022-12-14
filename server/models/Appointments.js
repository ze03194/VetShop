module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        appointmentDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        appointmentTime: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pet_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })

    return Appointments;
}