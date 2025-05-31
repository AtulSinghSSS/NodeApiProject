// models/index.js
const dbConfig = require("../config/db.js");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.userAuth = require("./auth.model.js")(sequelize, DataTypes);
db.car = require("./availableCarModel.js")(sequelize, DataTypes);
db.booking = require('./BookingModel.js')(sequelize, DataTypes);


module.exports = db;
