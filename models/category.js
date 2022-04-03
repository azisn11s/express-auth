const { Sequelize, Model, DataTypes } = require("sequelize");
const databaseConnection = require('../utils/database');

const Category = databaseConnection.define('categories', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    slug: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['slug']
        }
    ],
    timestamps: false,
  })

module.exports = Category;