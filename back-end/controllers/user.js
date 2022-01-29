const User = require("../models").user;
var bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const controller = {
  getAll: async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).send(users);
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  },
  addUser: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      if (!firstName || !lastName || !password || !email) {
        return res.status(400);
      }
      let user = await User.findOne({
        where: { email },
      });
      if (user) {
        return res.status(400);
      }
      bcrypt.genSalt(5, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          user = await User.create({firstName, lastName, password: hash, email});
          return res.status(201).json({ message: "Account created!", user });
        });
      });
    } catch (error) {
      console.log(error);
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!password || !email) {
        return res.status(400);
      }
      let user = await User.findOne({
        where: { email },
      });
      if (user) {
        res.status(400);
      }
      bcrypt.compare(password, user.password, function(err, data) {
        if(err){
          return res.status(400)
        }
        return res.status(200).json({"token": jwt.sign({id: user.id}, 'secretjwtkey', { expiresIn: 604800 }), user: user})
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
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
      console.log(error);
    }
  },
};

module.exports = controller;
