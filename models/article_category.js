const { Sequelize, Model, DataTypes } = require("sequelize");
const databaseConnection = require('../utils/database');
const Article = require('../models/article');
const Category = require('../models/category');

const Article_Categories = databaseConnection.define('article_categories', {}, { timestamps: false });
Article.belongsToMany(Category, { through: Article_Categories });
Category.belongsToMany(Article, { through: Article_Categories });

module.exports = Article_Categories;
