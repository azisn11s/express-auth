const { Sequelize, Model, DataTypes } = require("sequelize");
const databaseConnection = require('../utils/database');

const Article = databaseConnection.define('articles', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    captions: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
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
  })

module.exports = Article;