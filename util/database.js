const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'ivCXu588vNCK1pUsumfs65ZQ', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
