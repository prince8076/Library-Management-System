const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const Book = sequelize.define('Book', {
    title: { type: DataTypes.STRING, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
    genre: { type: DataTypes.STRING, allowNull: false },
    isAvailable: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { timestamps: true });

module.exports = Book;
