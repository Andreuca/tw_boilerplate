const Project = require("../models/Project")

const controller = {
  getAll: async (req, res) => {
    try {
      const projects = await Project.findAll();
      return res.status(200).send(projects);
    } catch (error) {
      console.log(error);
    }
  },
  getProject: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404);
      }
      return res.status(200).json(project);
    } catch (error) {
      console.log(error);
    }
  },
}

module.exports = controller