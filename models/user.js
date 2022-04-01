const { Sequelize, Model, DataTypes } = require("sequelize");
const databaseConnection = require('../utils/database');

const User = databaseConnection.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        default: new Date()
    },
    update_at: {
        type: DataTypes.DATE,
    }
}, {
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['username', 'email']
        }
    ]
  })

module.exports = User;