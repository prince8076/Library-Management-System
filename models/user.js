const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('admin', 'librarian', 'member'), allowNull: false },
    isConfirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { timestamps: true });

module.exports = User;
