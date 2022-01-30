const User = require("../models").user;

const controller = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json({users});
    } catch (error) {
      return res.status(500);
    }
  },
  getUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404);
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500);
    }
  },
  getUserByProject: async (req, res) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const offset = parseInt(req.params.offset);
      const user = await User.findAndCountAll({
        where: {
          projectId,
        },
        limit: 1,
        offset,
      });
      if (!user) {
        return res.status(404);
      }
      return res.status(200).json(user);
    } catch (error) {
      return res.status(500);
    }
  },
  addUser: async (req, res) => {
    try {
      const { firstName, lastName, email, projectId} = req.body;
      if (!firstName || !lastName || !email || !projectId) {
        return res.status(400);
      }
      let user = await User.findOne({
        where: { email },
      });
      if (user) {
        return res.sendStatus(400);
      }
      user = await User.create({
        firstName,
        lastName,
        email,
        projectId
      });

      return res.status(201).json({ message: "User created!", user });
    } catch (error) {
      return res.status(500);
    }
  },
  updateUser: async (req, res) => {
    try {
      const { firstName, lastName } = req.body;
      const id = parseInt(req.params.id);
      let user = await User.findByPk(id);
      if (!user) {
        return res.status(404);
      }
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save();

      return res
        .status(200)
        .json({ message: "Data updated succesfully!", user });
    } catch (error) {
      return res.status(500);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (!id) {
        return res.status(400);
      }
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404);
      }
      await user.destroy();
      res.statusCode = 200;
      return res.json({ message: "Account deleted!" });
    } catch (error) {
      return res.status(500);
    }
  },
};

module.exports = controller;
