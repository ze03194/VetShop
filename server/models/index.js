'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const {Users} = require("./Users");
const {Pets} = require("./Pets");
const {DataTypes} = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.users = require('./Users')(sequelize, DataTypes);
db.pets = require('./Pets')(sequelize, DataTypes);
db.employees = require('./Employees')(sequelize, DataTypes)
db.appointments = require('./Appointments')(sequelize, DataTypes);
db.accessToken = require('./AccessTokens')(sequelize, DataTypes);
db.refreshToken = require('./RefreshTokens')(sequelize, DataTypes);
db.orders = require('./Orders')(sequelize, DataTypes);
db.products = require('./Products')(sequelize, DataTypes);

db.users.hasMany(db.pets, {
    foreignKey: 'user_id',
    as: 'Pets'
});

db.orders.hasMany(db.products);

db.users.hasMany(db.appointments, {
    foreignKey: 'user_id',
    as: 'Appointments'
})

db.pets.hasMany(db.appointments, {
    foreignKey: 'pet_id',
    as: 'Pets'
});

module.exports = db;
