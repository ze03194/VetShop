module.exports = (sequelize, DataTypes) => {
    const Employees = sequelize.define("Employees", {
        employeeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        position: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })

    return Employees;
}

