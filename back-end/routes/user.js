const express = require("express");
const router = express.Router();
const userController = require("../controllers").user;

router.get("/", userController.getAll);
router.get("/:id/", userController.getUser);
router.post("/", userController.addUser);
router.patch("/:id/", userController.updateUser);
router.delete("/:id/", userController.deleteUser);

module.exports = router;
