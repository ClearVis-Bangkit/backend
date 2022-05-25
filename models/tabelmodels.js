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
}, {
    freezeTableName: true,
});

const userHistory = db.define('history', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = {
    Users,
    userHistory,
};
