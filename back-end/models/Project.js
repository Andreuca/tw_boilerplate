const db = require("../config/db");
const sequelize = require("sequelize");
const User = require("./User");

const Project = db.define("project", {
  name: sequelize.STRING,
  link: sequelize.STRING,
});

Project.hasMany(User);
User.belongsTo(Project);

module.exports = Project;
