const Project = require("../models/Project");

const controller = {
  getAll: async (req, res) => {
    try {
      const projects = await Project.findAll();
      return res.status(200).send(projects);
    } catch (error) {
      return res.status(500)
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
      return res.status(500)
    }
  },
  addProject: async (req, res) => {
    try {
      const { name, link } = req.body;
      if (!name || !link) {
        return res.status(400);
      }
      const project = await Project.create({
        name,
        link,
      });
      return res.status(201).json({ message: "Project created!", project });
    } catch (error) {
      return res.status(500)
    }
  },
  updateProject: async (req, res) => {
    try {
      const { link, name } = req.body;
      const id = parseInt(req.params.id);
      let project = await Project.findByPk(id);
      if (!project) {
        return res.status(404);
      }
      project.name = name;
      project.link = link;
      await project.save();

      return res
        .status(200)
        .json({ message: "Data updated succesfully!", project });
    } catch (error) {
      return res.status(500)
    }
  },
  deleteProject: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.status(400);
      }
      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404);
      }
      await project.destroy();
      res.statusCode = 200;
      return res.json({ message: "Account deleted!" });
    } catch (error) {
      return res.status(500)
    }
  },
};

module.exports = controller;
