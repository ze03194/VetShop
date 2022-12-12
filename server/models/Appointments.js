module.exports = (sequelize, DataTypes) => {
    const Appointments = sequelize.define("Appointments", {
        date: {
            type: DataTypes.DATE
        }
    })

    return Appointments;
}