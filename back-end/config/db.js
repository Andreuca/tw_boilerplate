const Sequelize = require("sequelize");

const db = new Sequelize("anonymous_grading", "root", "", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: true,
  },
});

module.exports = db;
