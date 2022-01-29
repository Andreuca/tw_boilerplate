const user = require("./user");
const project = require("./project");

project.hasMany(user);
user.belongsTo(project);

module.exports = {
  user: user,
  project: project,
};
