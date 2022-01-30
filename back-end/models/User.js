const db = require("../config/db");
const sequelize = require("sequelize");

const User = db.define(
  "user",
  {
    firstName: sequelize.STRING,
    lastName: sequelize.STRING,
    email: sequelize.STRING,
  },
);

module.exports = User
