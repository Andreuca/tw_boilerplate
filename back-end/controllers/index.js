const userController = require("./user");
const projectController = require("./project");
const dbController = require("./db");

const controllers = {
  user: userController,
  db: dbController,
  project: projectController,
};

module.exports = controllers;
