const Sequelize = require('sequelize');
const db = require('../config/database');

const { DataTypes } = Sequelize;

const Users = db.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: true,
    }
}, {
    freezeTableName: true,
});

module.exports = {
    Users,
};
