const Sequelize = require('sequelize');

const sequelize = new Sequelize('express_auth', 'postgres', 'password', {
  dialect: 'postgres',
  host: 'localhost'
});

module.exports = sequelize;
