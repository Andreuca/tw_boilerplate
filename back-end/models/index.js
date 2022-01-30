const user = require("./User");
const project = require("./Project");

project.hasMany(user);
user.belongsTo(project);

module.exports = {
  user: user,
  project: project,
};
