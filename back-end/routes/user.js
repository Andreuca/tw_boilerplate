const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;

router.get("/getAll", userController.getAll);
router.get("/:id/", userController.getUser);
router.post("/", userController.addUser);
router.post("/login/", userController.login);
router.patch("/:id/", userController.updateUser);
router.delete("/:id/", userController.deleteUser);

module.exports = router;
