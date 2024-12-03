const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config');

const BorrowedBook = sequelize.define('BorrowedBook', {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    bookId: { type: DataTypes.INTEGER, allowNull: false },
    borrowedDate: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
    returnDate: { type: DataTypes.DATE, allowNull: true },
}, { timestamps: true });

module.exports = BorrowedBook;
