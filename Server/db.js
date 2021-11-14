const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  "postgres://postgres:f628f3b8b9814e97b09090ea30d1906f@localhost:5432/eleven-journal"
);
  

module.exports = sequelize;